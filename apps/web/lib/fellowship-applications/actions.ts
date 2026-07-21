"use server";

import { getAdminSession } from "@/lib/admin/get-admin-session";
import { prisma } from "@/lib/db/prisma";

import { FELLOWSHIP_APPLICATION_TYPE } from "./constants";
import {
  isFellowshipApplicationReviewStatus,
  type FellowshipApplicationReviewStatus,
} from "./review-status";

type ActionResult =
  | {
      success: true;
      reviewStatus: FellowshipApplicationReviewStatus;
      reviewedAt: string;
    }
  | { success: false; error: string };

async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function updateFellowshipApplicationReviewStatus(
  id: string,
  reviewStatus: unknown,
): Promise<ActionResult> {
  try {
    const session = await requireAdminSession();

    if (!isFellowshipApplicationReviewStatus(reviewStatus)) {
      return { success: false, error: "Invalid review status." };
    }

    const existing = await prisma.formSubmission.findFirst({
      where: {
        id,
        type: FELLOWSHIP_APPLICATION_TYPE,
      },
      select: { id: true },
    });

    if (!existing) {
      return { success: false, error: "Application not found." };
    }

    const reviewedAt = new Date();

    await prisma.formSubmission.update({
      where: { id },
      data: {
        reviewStatus,
        reviewedAt,
        reviewedBy: session.user.id,
      },
    });

    return {
      success: true,
      reviewStatus,
      reviewedAt: reviewedAt.toISOString(),
    };
  } catch (error) {
    console.error(
      "[fellowship-applications] Failed to update review status:",
      error,
    );
    return { success: false, error: "Failed to update review status." };
  }
}
