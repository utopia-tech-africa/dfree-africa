import { NextResponse } from "next/server";

import { createFellowshipApplicationSubmission } from "@/lib/fellowship-applications/create-submission";
import { parseFellowshipSubmissionRequest } from "@/lib/fellowship-applications/parse-submission-request";

export const maxDuration = 60;

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_form_data" },
      { status: 400 },
    );
  }

  const parsed = await parseFellowshipSubmissionRequest(formData);

  if (!parsed.ok) {
    const status = parsed.error === "validation_error" ? 400 : 400;

    return NextResponse.json(
      {
        success: false,
        error: parsed.error,
        issues: parsed.issues,
      },
      { status },
    );
  }

  try {
    const submission = await createFellowshipApplicationSubmission(
      parsed.payload,
    );

    return NextResponse.json({
      success: true,
      id: submission.id,
    });
  } catch (error) {
    console.error(
      "[fellowship-applications] Failed to save submission:",
      error,
    );
    return NextResponse.json(
      { success: false, error: "submission_failed" },
      { status: 500 },
    );
  }
}
