import { after } from "next/server";

import { sendFormAcknowledgement } from "@/lib/email/send-form-acknowledgement";
import { prisma } from "@/lib/db/prisma";

import { FELLOWSHIP_SPONSOR_TYPE } from "./constants";
import type { FellowshipSponsorPayload } from "./types";

async function sendSubmissionAcknowledgement(
  submissionId: string,
  payload: FellowshipSponsorPayload,
) {
  const submitterName = `${payload.firstName} ${payload.lastName}`.trim();

  const { sent } = await sendFormAcknowledgement({
    to: payload.email,
    formType: "fellowship-sponsor",
    submitterName,
  });

  if (sent) {
    await prisma.formSubmission.update({
      where: { id: submissionId },
      data: { acknowledgementSentAt: new Date() },
    });
  }
}

export async function createFellowshipSponsorSubmission(
  payload: FellowshipSponsorPayload,
) {
  const submission = await prisma.formSubmission.create({
    data: {
      type: FELLOWSHIP_SPONSOR_TYPE,
      payload,
    },
  });

  after(async () => {
    try {
      await sendSubmissionAcknowledgement(submission.id, payload);
    } catch (error) {
      console.error(
        "[fellowship-sponsors] Failed to send acknowledgement email:",
        error,
      );
    }
  });

  return submission;
}
