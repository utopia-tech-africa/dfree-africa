import { after } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { sendFellowshipSponsorAcknowledgement } from "@/lib/fellowship-sponsors/create-submission";
import { markFellowshipSponsorPaymentPaid } from "@/lib/fellowship-sponsors/payment";
import { getStripeClient } from "@/lib/stripe/client";
import { isStripeConfigured } from "@/lib/stripe/config";

export const runtime = "nodejs";

const confirmSchema = z.object({
  sessionId: z.string().min(1),
});

function getSubmissionIdFromSession(session: {
  metadata?: Record<string, string> | null;
  client_reference_id?: string | null;
}): string | null {
  const fromMetadata = session.metadata?.submissionId?.trim();
  if (fromMetadata) {
    return fromMetadata;
  }

  const fromReference = session.client_reference_id?.trim();
  return fromReference || null;
}

function getPaymentIntentId(session: {
  payment_intent?: string | { id: string } | null;
}): string | null {
  if (typeof session.payment_intent === "string") {
    return session.payment_intent;
  }

  if (session.payment_intent && typeof session.payment_intent === "object") {
    return session.payment_intent.id;
  }

  return null;
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { success: false, error: "stripe_not_configured" },
      { status: 503 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_form_data" },
      { status: 400 },
    );
  }

  const parsed = confirmSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "validation_error" },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(
      parsed.data.sessionId,
    );

    const submissionId = getSubmissionIdFromSession(session);

    if (!submissionId) {
      return NextResponse.json(
        { success: false, error: "invalid_session" },
        { status: 400 },
      );
    }

    const isPaid =
      session.payment_status === "paid" || session.status === "complete";

    if (!isPaid) {
      return NextResponse.json({
        success: true,
        paid: false,
        status: session.payment_status ?? session.status ?? "unpaid",
      });
    }

    const amountCents =
      session.amount_total ?? Number(session.metadata?.amountCents ?? 0);

    if (!Number.isFinite(amountCents) || amountCents <= 0) {
      return NextResponse.json(
        { success: false, error: "invalid_amount" },
        { status: 400 },
      );
    }

    const payload = await markFellowshipSponsorPaymentPaid({
      submissionId,
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: getPaymentIntentId(session),
      amountCents,
    });

    if (!payload) {
      return NextResponse.json(
        { success: false, error: "submission_not_found" },
        { status: 404 },
      );
    }

    after(async () => {
      try {
        await sendFellowshipSponsorAcknowledgement(submissionId, payload);
      } catch (error) {
        console.error(
          "[fellowship-sponsors/checkout/confirm] Failed to send acknowledgement:",
          error,
        );
      }
    });

    return NextResponse.json({ success: true, paid: true });
  } catch (error) {
    console.error(
      "[fellowship-sponsors/checkout/confirm] Failed to confirm:",
      error,
    );
    return NextResponse.json(
      { success: false, error: "confirm_failed" },
      { status: 500 },
    );
  }
}
