import { randomBytes, timingSafeEqual } from "node:crypto";

import { prisma } from "@/lib/db/prisma";

import { FELLOWSHIP_SPONSOR_TYPE } from "./constants";
import {
  fellowshipSponsorPayloadSchema,
  type FellowshipSponsorPayload,
  type SponsorPaymentInfo,
} from "./types";

export function createSponsorCheckoutCancelToken(): string {
  return randomBytes(32).toString("hex");
}

function tokensMatch(expected: string, provided: string): boolean {
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, providedBuffer);
}

export function buildPendingSponsorPayment(input: {
  amountCents: number;
  stripeCheckoutSessionId: string;
  cancelToken: string;
}): SponsorPaymentInfo {
  return {
    status: "pending",
    amountCents: input.amountCents,
    currency: "usd",
    stripeCheckoutSessionId: input.stripeCheckoutSessionId,
    cancelToken: input.cancelToken,
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
  options: { cancelToken?: string; bypassToken?: boolean } = {},
): Promise<{ ok: true } | { ok: false; error: string }> {
  const submission = await prisma.formSubmission.findFirst({
    where: {
      id: submissionId,
      type: FELLOWSHIP_SPONSOR_TYPE,
    },
  });

  if (!submission) {
    return { ok: false, error: "not_found" };
  }

  const parsed = fellowshipSponsorPayloadSchema.safeParse(submission.payload);

  if (!parsed.success || !parsed.data.payment) {
    return { ok: false, error: "not_found" };
  }

  if (parsed.data.payment.status !== "pending") {
    return { ok: true };
  }

  if (!options.bypassToken) {
    const expectedToken = parsed.data.payment.cancelToken;

    if (!expectedToken || !options.cancelToken) {
      return { ok: false, error: "unauthorized" };
    }

    if (!tokensMatch(expectedToken, options.cancelToken)) {
      return { ok: false, error: "unauthorized" };
    }
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

  return { ok: true };
}

/** Deletes old unpaid checkout rows so abandoned attempts do not pile up. */
export async function cleanupAbandonedSponsorCheckouts(options?: {
  olderThanDays?: number;
  limit?: number;
}): Promise<number> {
  const olderThanDays = options?.olderThanDays ?? 14;
  const limit = options?.limit ?? 50;
  const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);

  const candidates = await prisma.formSubmission.findMany({
    where: {
      type: FELLOWSHIP_SPONSOR_TYPE,
      createdAt: { lt: cutoff },
    },
    select: { id: true, payload: true },
    orderBy: { createdAt: "asc" },
    take: limit * 3,
  });

  const idsToDelete = candidates
    .filter((candidate) => {
      const parsed = fellowshipSponsorPayloadSchema.safeParse(
        candidate.payload,
      );

      if (!parsed.success) {
        return false;
      }

      const status = parsed.data.payment?.status;
      return status === "pending" || status === "cancelled";
    })
    .slice(0, limit)
    .map((candidate) => candidate.id);

  if (!idsToDelete.length) {
    return 0;
  }

  const result = await prisma.formSubmission.deleteMany({
    where: { id: { in: idsToDelete } },
  });

  return result.count;
}
