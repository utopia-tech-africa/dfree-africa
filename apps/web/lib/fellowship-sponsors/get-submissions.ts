import { prisma } from "@/lib/db/prisma";

import { FELLOWSHIP_SPONSOR_TYPE } from "./constants";
import {
  fellowshipSponsorPayloadSchema,
  type FellowshipSponsorPayload,
  type FellowshipSponsorSummary,
} from "./types";

function toSummary(
  id: string,
  createdAt: Date,
  payload: FellowshipSponsorPayload,
): FellowshipSponsorSummary {
  return {
    id,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    organization: payload.organization,
    sponsorshipTier: payload.sponsorshipTier,
    customFellowCount: payload.customFellowCount,
    createdAt,
  };
}

export async function getFellowshipSponsorSummaries(): Promise<
  FellowshipSponsorSummary[]
> {
  const submissions = await prisma.formSubmission.findMany({
    where: { type: FELLOWSHIP_SPONSOR_TYPE },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      payload: true,
      createdAt: true,
    },
  });

  return submissions.flatMap((submission) => {
    const parsed = fellowshipSponsorPayloadSchema.safeParse(submission.payload);

    if (!parsed.success) {
      return [];
    }

    return [toSummary(submission.id, submission.createdAt, parsed.data)];
  });
}

export async function getFellowshipSponsorById(id: string) {
  const submission = await prisma.formSubmission.findFirst({
    where: {
      id,
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

  return {
    id: submission.id,
    createdAt: submission.createdAt,
    acknowledgementSentAt: submission.acknowledgementSentAt,
    payload: parsed.data,
  };
}

export async function getFellowshipSponsorCount(): Promise<number> {
  return prisma.formSubmission.count({
    where: { type: FELLOWSHIP_SPONSOR_TYPE },
  });
}

export async function getRecentFellowshipSponsorSummaries(
  limit = 5,
): Promise<FellowshipSponsorSummary[]> {
  const submissions = await prisma.formSubmission.findMany({
    where: { type: FELLOWSHIP_SPONSOR_TYPE },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      payload: true,
      createdAt: true,
    },
  });

  return submissions.flatMap((submission) => {
    const parsed = fellowshipSponsorPayloadSchema.safeParse(submission.payload);

    if (!parsed.success) {
      return [];
    }

    return [toSummary(submission.id, submission.createdAt, parsed.data)];
  });
}
