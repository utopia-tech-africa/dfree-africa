import { after } from "next/server";

import { sendFormAcknowledgement } from "@/lib/email/send-form-acknowledgement";
import { prisma } from "@/lib/db/prisma";

import { FELLOWSHIP_APPLICATION_TYPE } from "./constants";
import type { FellowshipApplicationPayload } from "./types";

async function sendSubmissionAcknowledgement(
  submissionId: string,
  payload: FellowshipApplicationPayload,
) {
  const submitterName = `${payload.firstName} ${payload.lastName}`.trim();

  const { sent } = await sendFormAcknowledgement({
    to: payload.email,
    formType: "fellowship-application",
    submitterName,
  });

  if (sent) {
    await prisma.formSubmission.update({
      where: { id: submissionId },
      data: { acknowledgementSentAt: new Date() },
    });
  }
}

export async function createFellowshipApplicationSubmission(
  payload: FellowshipApplicationPayload,
) {
  const submission = await prisma.formSubmission.create({
    data: {
      type: FELLOWSHIP_APPLICATION_TYPE,
      payload,
    },
  });

  after(async () => {
    try {
      await sendSubmissionAcknowledgement(submission.id, payload);
    } catch (error) {
      console.error(
        "[fellowship-applications] Failed to send acknowledgement email:",
        error,
      );
    }
  });

  return submission;
}
