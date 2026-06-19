import { leadershipInstituteApplicationSchema } from "@/lib/forms/schemas/leadership-institute-application";

import {
  fellowshipApplicationPayloadSchema,
  type FellowshipApplicationPayload,
} from "./types";

type ParseSuccess = {
  ok: true;
  payload: FellowshipApplicationPayload;
};

type ParseFailure = {
  ok: false;
  error: "invalid_form_data" | "validation_error";
  issues?: Record<string, string[]>;
};

export type ParseSubmissionResult = ParseSuccess | ParseFailure;

export async function parseFellowshipSubmissionRequest(
  formData: FormData,
): Promise<ParseSubmissionResult> {
  const applicationRaw = formData.get("application");

  if (typeof applicationRaw !== "string") {
    return { ok: false, error: "invalid_form_data" };
  }

  let applicationJson: unknown;

  try {
    applicationJson = JSON.parse(applicationRaw);
  } catch {
    return { ok: false, error: "invalid_form_data" };
  }

  const parsedApplication =
    leadershipInstituteApplicationSchema.safeParse(applicationJson);

  if (!parsedApplication.success) {
    return {
      ok: false,
      error: "validation_error",
      issues: parsedApplication.error.flatten().fieldErrors,
    };
  }

  const payload = fellowshipApplicationPayloadSchema.safeParse(
    parsedApplication.data,
  );

  if (!payload.success) {
    return {
      ok: false,
      error: "validation_error",
      issues: payload.error.flatten().fieldErrors,
    };
  }

  return { ok: true, payload: payload.data };
}
