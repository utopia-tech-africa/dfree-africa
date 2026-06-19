import { prisma } from "@/lib/db/prisma";

import { FELLOWSHIP_APPLICATION_TYPE } from "./constants";
import {
  storedFellowshipApplicationPayloadSchema,
  type FellowshipApplicationPayload,
  type FellowshipApplicationSummary,
} from "./types";

function toSummary(
  id: string,
  createdAt: Date,
  payload: FellowshipApplicationPayload,
): FellowshipApplicationSummary {
  return {
    id,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    cohortTerm: payload.cohortTerm,
    createdAt,
  };
}

export async function getFellowshipApplicationSummaries(): Promise<
  FellowshipApplicationSummary[]
> {
  const submissions = await prisma.formSubmission.findMany({
    where: { type: FELLOWSHIP_APPLICATION_TYPE },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      payload: true,
      createdAt: true,
    },
  });

  return submissions.flatMap((submission) => {
    const parsed = storedFellowshipApplicationPayloadSchema.safeParse(
      submission.payload,
    );

    if (!parsed.success) {
      return [];
    }

    return [toSummary(submission.id, submission.createdAt, parsed.data)];
  });
}

export async function getFellowshipApplicationById(id: string) {
  const submission = await prisma.formSubmission.findFirst({
    where: {
      id,
      type: FELLOWSHIP_APPLICATION_TYPE,
    },
  });

  if (!submission) {
    return null;
  }

  const parsed = storedFellowshipApplicationPayloadSchema.safeParse(
    submission.payload,
  );

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

export async function getFellowshipApplicationCount(): Promise<number> {
  return prisma.formSubmission.count({
    where: { type: FELLOWSHIP_APPLICATION_TYPE },
  });
}

export async function getRecentFellowshipApplicationSummaries(
  limit = 5,
): Promise<FellowshipApplicationSummary[]> {
  const submissions = await prisma.formSubmission.findMany({
    where: { type: FELLOWSHIP_APPLICATION_TYPE },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      payload: true,
      createdAt: true,
    },
  });

  return submissions.flatMap((submission) => {
    const parsed = storedFellowshipApplicationPayloadSchema.safeParse(
      submission.payload,
    );

    if (!parsed.success) {
      return [];
    }

    return [toSummary(submission.id, submission.createdAt, parsed.data)];
  });
}
