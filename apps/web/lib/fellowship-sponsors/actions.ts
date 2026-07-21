"use server";

import { getAdminSession } from "@/lib/admin/get-admin-session";
import { sendFellowshipSponsorAcknowledgement } from "@/lib/fellowship-sponsors/create-submission";
import { getFellowshipSponsorById } from "@/lib/fellowship-sponsors/get-submissions";

type ActionResult =
  | { success: true; acknowledgementSentAt: string }
  | { success: false; error: string };

async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

export async function sendSponsorAcknowledgementEmail(
  submissionId: string,
): Promise<ActionResult> {
  try {
    await requireAdminSession();

    const submission = await getFellowshipSponsorById(submissionId);

    if (!submission) {
      return { success: false, error: "Sponsor inquiry not found." };
    }

    const result = await sendFellowshipSponsorAcknowledgement(
      submissionId,
      submission.payload,
      { force: true },
    );

    if (!result.sent) {
      return {
        success: false,
        error:
          result.reason === "not_found"
            ? "Sponsor inquiry not found."
            : "Could not send acknowledgement email.",
      };
    }

    return {
      success: true,
      acknowledgementSentAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(
      "[fellowship-sponsors] Failed to send acknowledgement from admin:",
      error,
    );
    return {
      success: false,
      error: "Failed to send acknowledgement email.",
    };
  }
}
