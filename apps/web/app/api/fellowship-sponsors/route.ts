import { NextResponse } from "next/server";

import { createFellowshipSponsorSubmission } from "@/lib/fellowship-sponsors/create-submission";
import { parseFellowshipSponsorSubmissionRequest } from "@/lib/fellowship-sponsors/parse-submission-request";

export const maxDuration = 60;

export async function POST(request: Request) {
  const parsed = await parseFellowshipSponsorSubmissionRequest(request);

  if (!parsed.ok) {
    return NextResponse.json(
      {
        success: false,
        error: parsed.error,
        issues: parsed.issues,
      },
      { status: 400 },
    );
  }

  try {
    const submission = await createFellowshipSponsorSubmission(parsed.payload);

    return NextResponse.json({
      success: true,
      id: submission.id,
    });
  } catch (error) {
    console.error("[fellowship-sponsors] Failed to save submission:", error);
    return NextResponse.json(
      { success: false, error: "submission_failed" },
      { status: 500 },
    );
  }
}
