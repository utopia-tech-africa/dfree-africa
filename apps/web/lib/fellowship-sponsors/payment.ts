import { prisma } from "@/lib/db/prisma";

import { FELLOWSHIP_SPONSOR_TYPE } from "./constants";
import {
  fellowshipSponsorPayloadSchema,
  type FellowshipSponsorPayload,
  type SponsorPaymentInfo,
} from "./types";

export function buildPendingSponsorPayment(input: {
  amountCents: number;
  stripeCheckoutSessionId: string;
}): SponsorPaymentInfo {
  return {
    status: "pending",
    amountCents: input.amountCents,
    currency: "usd",
    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
  };
}

export async function markFellowshipSponsorPaymentPaid(input: {
  submissionId: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string | null;
  amountCents: number;
}): Promise<FellowshipSponsorPayload | null> {
  const submission = await prisma.formSubmission.findFirst({
    where: {
      id: input.submissionId,
      type: FELLOWSHIP_SPONSOR_TYPE,
    },
  });

  if (!submission) {
    return null;
  }

  const parsed = fellowshipSponsorPayloadSchema.safeParse(submission.payload);

  if (!parsed.success) {
    return null;
  }

  if (parsed.data.payment?.status === "paid") {
    return parsed.data;
  }

  const nextPayload: FellowshipSponsorPayload = {
    ...parsed.data,
    payment: {
      status: "paid",
      amountCents: input.amountCents,
      currency: "usd",
      stripeCheckoutSessionId: input.stripeCheckoutSessionId,
      ...(input.stripePaymentIntentId
        ? { stripePaymentIntentId: input.stripePaymentIntentId }
        : {}),
      paidAt: new Date().toISOString(),
    },
  };

  await prisma.formSubmission.update({
    where: { id: submission.id },
    data: { payload: nextPayload },
  });

  return nextPayload;
}

export async function markFellowshipSponsorCheckoutCancelled(
  submissionId: string,
): Promise<void> {
  const submission = await prisma.formSubmission.findFirst({
    where: {
      id: submissionId,
      type: FELLOWSHIP_SPONSOR_TYPE,
    },
  });

  if (!submission) {
    return;
  }

  const parsed = fellowshipSponsorPayloadSchema.safeParse(submission.payload);

  if (!parsed.success || !parsed.data.payment) {
    return;
  }

  if (parsed.data.payment.status !== "pending") {
    return;
  }

  const nextPayload: FellowshipSponsorPayload = {
    ...parsed.data,
    payment: {
      ...parsed.data.payment,
      status: "cancelled",
    },
  };

  await prisma.formSubmission.update({
    where: { id: submission.id },
    data: { payload: nextPayload },
  });
}
