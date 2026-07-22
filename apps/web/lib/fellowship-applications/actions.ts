"use server";

import { getAdminSession } from "@/lib/admin/get-admin-session";
import { prisma } from "@/lib/db/prisma";
import { sendFormAcknowledgement } from "@/lib/email/send-form-acknowledgement";

import { FELLOWSHIP_APPLICATION_TYPE } from "./constants";
import {
  FELLOWSHIP_APPLICATION_STATUS_EMAIL_TYPES,
  isFellowshipApplicationReviewStatus,
  normalizeFellowshipApplicationReviewStatus,
  type FellowshipApplicationReviewStatus,
} from "./review-status";
import { storedFellowshipApplicationPayloadSchema } from "./types";

type ActionResult =
  | {
      success: true;
      reviewStatus: FellowshipApplicationReviewStatus;
      reviewedAt: string;
      emailSent: boolean;
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
      select: {
        id: true,
        payload: true,
        reviewStatus: true,
      },
    });

    if (!existing) {
      return { success: false, error: "Application not found." };
    }

    const previousStatus = normalizeFellowshipApplicationReviewStatus(
      existing.reviewStatus,
    );

    if (previousStatus === reviewStatus) {
      return {
        success: true,
        reviewStatus,
        reviewedAt: new Date().toISOString(),
        emailSent: false,
      };
    }

    const parsed = storedFellowshipApplicationPayloadSchema.safeParse(
      existing.payload,
    );

    if (!parsed.success) {
      return {
        success: false,
        error: "Application payload is invalid; status was not updated.",
      };
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

    const submitterName =
      `${parsed.data.firstName} ${parsed.data.lastName}`.trim();
    let emailSent = false;

    try {
      const result = await sendFormAcknowledgement({
        to: parsed.data.email,
        formType: FELLOWSHIP_APPLICATION_STATUS_EMAIL_TYPES[reviewStatus],
        submitterName,
      });
      emailSent = result.sent;
    } catch (error) {
      console.error(
        "[fellowship-applications] Failed to send status update email:",
        error,
      );
    }

    return {
      success: true,
      reviewStatus,
      reviewedAt: reviewedAt.toISOString(),
      emailSent,
    };
  } catch (error) {
    console.error(
      "[fellowship-applications] Failed to update review status:",
      error,
    );
    return { success: false, error: "Failed to update review status." };
  }
}
