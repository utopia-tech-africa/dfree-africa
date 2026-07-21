import { NextResponse } from "next/server";

import { createFellowshipSponsorSubmission } from "@/lib/fellowship-sponsors/create-submission";
import { prisma } from "@/lib/db/prisma";
import { parseFellowshipSponsorSubmissionRequest } from "@/lib/fellowship-sponsors/parse-submission-request";
import {
  buildPendingSponsorPayment,
  cleanupAbandonedSponsorCheckouts,
  createSponsorCheckoutCancelToken,
} from "@/lib/fellowship-sponsors/payment";
import {
  formatSponsorshipCurrency,
  getFellowCount,
  getSponsorshipAmountCents,
  getSponsorshipTotal,
} from "@/lib/fellowship-sponsors/sponsorship-pricing";
import { sponsorshipTierValues } from "@/lib/forms/schemas/leadership-institute-sponsor";
import { siteUrl } from "@/lib/site-url";
import { getStripeClient } from "@/lib/stripe/client";
import { isStripeConfigured } from "@/lib/stripe/config";

export const maxDuration = 60;

const SUPPORTED_LOCALES = new Set(["en", "es", "fr"]);

function resolveLocale(request: Request): string {
  const url = new URL(request.url);
  const queryLocale = url.searchParams.get("locale")?.trim();

  if (queryLocale && SUPPORTED_LOCALES.has(queryLocale)) {
    return queryLocale;
  }

  const acceptLanguage = request.headers.get("accept-language")?.toLowerCase();

  if (acceptLanguage) {
    for (const locale of SUPPORTED_LOCALES) {
      if (acceptLanguage.includes(locale)) {
        return locale;
      }
    }
  }

  return "en";
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { success: false, error: "stripe_not_configured" },
      { status: 503 },
    );
  }

  const parsed = await parseFellowshipSponsorSubmissionRequest(request);

  if (!parsed.ok) {
    return NextResponse.json(
      {
        success: false,
        error: parsed.error,
        issues: parsed.issues,
      },
      { status: 400 },
    );
  }

  if (parsed.payload.paymentMethod !== "credit_card") {
    return NextResponse.json(
      { success: false, error: "invalid_payment_method" },
      { status: 400 },
    );
  }

  const { payload } = parsed;
  const sponsorshipTier = payload.sponsorshipTier;

  if (
    typeof sponsorshipTier !== "string" ||
    !sponsorshipTierValues.includes(
      sponsorshipTier as (typeof sponsorshipTierValues)[number],
    )
  ) {
    return NextResponse.json(
      { success: false, error: "validation_error" },
      { status: 400 },
    );
  }

  const locale = resolveLocale(request);
  const resolvedTier =
    sponsorshipTier as (typeof sponsorshipTierValues)[number];
  const amountCents = getSponsorshipAmountCents(
    resolvedTier,
    payload.customFellowCount,
  );
  const amountDollars = getSponsorshipTotal(
    resolvedTier,
    payload.customFellowCount,
  );
  const fellowCount = getFellowCount(resolvedTier, payload.customFellowCount);

  if (amountCents <= 0) {
    return NextResponse.json(
      { success: false, error: "invalid_amount" },
      { status: 400 },
    );
  }

  try {
    void cleanupAbandonedSponsorCheckouts().catch((error) => {
      console.error(
        "[fellowship-sponsors/checkout] Abandoned checkout cleanup failed:",
        error,
      );
    });

    const submission = await createFellowshipSponsorSubmission(payload, {
      sendAcknowledgement: false,
    });

    const stripe = getStripeClient();
    const origin = siteUrl.replace(/\/$/, "");
    const cancelToken = createSponsorCheckoutCancelToken();
    const successUrl = `${origin}/${locale}/leadership-institute/sponsor?checkout=success&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin}/${locale}/leadership-institute/sponsor?checkout=cancelled&submission_id=${submission.id}&cancel_token=${cancelToken}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: payload.email,
      client_reference_id: submission.id,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: "DFREE Bottom-Up Leadership Institute Sponsorship",
              description: `${fellowCount} fellow${fellowCount === 1 ? "" : "s"} · ${formatSponsorshipCurrency(amountDollars)}`,
            },
          },
        },
      ],
      metadata: {
        submissionId: submission.id,
        formType: "fellowship-sponsor",
        sponsorshipTier: resolvedTier,
        fellowCount: String(fellowCount),
        amountCents: String(amountCents),
      },
      payment_intent_data: {
        metadata: {
          submissionId: submission.id,
          formType: "fellowship-sponsor",
        },
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      return NextResponse.json(
        { success: false, error: "checkout_session_failed" },
        { status: 500 },
      );
    }

    await prisma.formSubmission.update({
      where: { id: submission.id },
      data: {
        payload: {
          ...payload,
          payment: buildPendingSponsorPayment({
            amountCents,
            stripeCheckoutSessionId: session.id,
            cancelToken,
          }),
        },
      },
    });

    return NextResponse.json({
      success: true,
      id: submission.id,
      checkoutUrl: session.url,
    });
  } catch (error) {
    console.error(
      "[fellowship-sponsors/checkout] Failed to create checkout:",
      error,
    );
    return NextResponse.json(
      { success: false, error: "checkout_failed" },
      { status: 500 },
    );
  }
}
