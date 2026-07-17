import { after } from "next/server";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { sendFellowshipSponsorAcknowledgement } from "@/lib/fellowship-sponsors/create-submission";
import {
  markFellowshipSponsorCheckoutCancelled,
  markFellowshipSponsorPaymentPaid,
} from "@/lib/fellowship-sponsors/payment";
import { getStripeClient } from "@/lib/stripe/client";
import { getStripeWebhookSecret } from "@/lib/stripe/config";

export const runtime = "nodejs";

function getSubmissionIdFromSession(
  session: Stripe.Checkout.Session,
): string | null {
  const fromMetadata = session.metadata?.submissionId?.trim();
  if (fromMetadata) {
    return fromMetadata;
  }

  const fromReference = session.client_reference_id?.trim();
  return fromReference || null;
}

function getPaymentIntentId(session: Stripe.Checkout.Session): string | null {
  if (typeof session.payment_intent === "string") {
    return session.payment_intent;
  }

  if (session.payment_intent && typeof session.payment_intent === "object") {
    return session.payment_intent.id;
  }

  return null;
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const submissionId = getSubmissionIdFromSession(session);

  if (!submissionId) {
    console.error(
      "[stripe/webhook] checkout.session.completed missing submissionId",
    );
    return;
  }

  const amountCents =
    session.amount_total ?? Number(session.metadata?.amountCents ?? 0);

  if (!Number.isFinite(amountCents) || amountCents <= 0) {
    console.error(
      "[stripe/webhook] checkout.session.completed missing amount",
      session.id,
    );
    return;
  }

  const payload = await markFellowshipSponsorPaymentPaid({
    submissionId,
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId: getPaymentIntentId(session),
    amountCents,
  });

  if (!payload) {
    console.error(
      "[stripe/webhook] Could not mark submission paid:",
      submissionId,
    );
    return;
  }

  after(async () => {
    try {
      await sendFellowshipSponsorAcknowledgement(submissionId, payload);
    } catch (error) {
      console.error(
        "[stripe/webhook] Failed to send acknowledgement email:",
        error,
      );
    }
  });
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const submissionId = getSubmissionIdFromSession(session);

  if (!submissionId) {
    return;
  }

  await markFellowshipSponsorCheckoutCancelled(submissionId);
}

export async function POST(request: Request) {
  const webhookSecret = getStripeWebhookSecret();

  if (!webhookSecret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "webhook_not_configured" },
      { status: 503 },
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const body = await request.text();
  const stripe = getStripeClient();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("[stripe/webhook] Signature verification failed:", error);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case "checkout.session.expired":
        await handleCheckoutExpired(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      default:
        break;
    }
  } catch (error) {
    console.error("[stripe/webhook] Handler failed:", error);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
