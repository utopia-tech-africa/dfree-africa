import { prisma } from "@/lib/db/prisma";

import { FELLOWSHIP_APPLICATION_TYPE } from "./constants";
import {
  normalizeFellowshipApplicationReviewStatus,
  type FellowshipApplicationReviewStatus,
} from "./review-status";
import {
  storedFellowshipApplicationPayloadSchema,
  type FellowshipApplicationPayload,
  type FellowshipApplicationSummary,
} from "./types";

function toSummary(
  id: string,
  createdAt: Date,
  acknowledgementSentAt: Date | null,
  reviewStatus: string,
  reviewedAt: Date | null,
  payload: FellowshipApplicationPayload,
): FellowshipApplicationSummary {
  return {
    id,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    cohortTerm: payload.cohortTerm,
    createdAt,
    acknowledgementSentAt,
    reviewStatus: normalizeFellowshipApplicationReviewStatus(reviewStatus),
    reviewedAt,
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
      acknowledgementSentAt: true,
      reviewStatus: true,
      reviewedAt: true,
    },
  });

  return submissions.flatMap((submission) => {
    const parsed = storedFellowshipApplicationPayloadSchema.safeParse(
      submission.payload,
    );

    if (!parsed.success) {
      return [];
    }

    return [
      toSummary(
        submission.id,
        submission.createdAt,
        submission.acknowledgementSentAt,
        submission.reviewStatus,
        submission.reviewedAt,
        parsed.data,
      ),
    ];
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
    reviewStatus: normalizeFellowshipApplicationReviewStatus(
      submission.reviewStatus,
    ),
    reviewedAt: submission.reviewedAt,
    reviewedBy: submission.reviewedBy,
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
      acknowledgementSentAt: true,
      reviewStatus: true,
      reviewedAt: true,
    },
  });

  return submissions.flatMap((submission) => {
    const parsed = storedFellowshipApplicationPayloadSchema.safeParse(
      submission.payload,
    );

    if (!parsed.success) {
      return [];
    }

    return [
      toSummary(
        submission.id,
        submission.createdAt,
        submission.acknowledgementSentAt,
        submission.reviewStatus,
        submission.reviewedAt,
        parsed.data,
      ),
    ];
  });
}

export type FellowshipApplicationExportFilters = {
  reviewStatus?: FellowshipApplicationReviewStatus | "all";
  cohortTerm?: "spring" | "fall" | "all";
};

export async function getFellowshipApplicationsForExport(
  filters: FellowshipApplicationExportFilters = {},
) {
  const submissions = await prisma.formSubmission.findMany({
    where: {
      type: FELLOWSHIP_APPLICATION_TYPE,
      ...(filters.reviewStatus && filters.reviewStatus !== "all"
        ? { reviewStatus: filters.reviewStatus }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return submissions.flatMap((submission) => {
    const parsed = storedFellowshipApplicationPayloadSchema.safeParse(
      submission.payload,
    );

    if (!parsed.success) {
      return [];
    }

    if (
      filters.cohortTerm &&
      filters.cohortTerm !== "all" &&
      parsed.data.cohortTerm !== filters.cohortTerm
    ) {
      return [];
    }

    return [
      {
        id: submission.id,
        createdAt: submission.createdAt,
        acknowledgementSentAt: submission.acknowledgementSentAt,
        reviewStatus: normalizeFellowshipApplicationReviewStatus(
          submission.reviewStatus,
        ),
        reviewedAt: submission.reviewedAt,
        payload: parsed.data,
      },
    ];
  });
}
