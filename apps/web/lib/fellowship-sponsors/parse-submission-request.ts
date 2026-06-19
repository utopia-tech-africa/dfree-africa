import { leadershipInstituteSponsorSchema } from "@/lib/forms/schemas/leadership-institute-sponsor";

import {
  fellowshipSponsorPayloadSchema,
  type FellowshipSponsorPayload,
} from "./types";

type ParseSuccess = {
  ok: true;
  payload: FellowshipSponsorPayload;
};

type ParseFailure = {
  ok: false;
  error: "invalid_form_data" | "validation_error";
  issues?: Record<string, string[]>;
};

export type ParseSponsorSubmissionResult = ParseSuccess | ParseFailure;

export async function parseFellowshipSponsorSubmissionRequest(
  body: unknown,
): Promise<ParseSponsorSubmissionResult> {
  const parsed = leadershipInstituteSponsorSchema.safeParse(body);

  if (!parsed.success) {
    return {
      ok: false,
      error: "validation_error",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = fellowshipSponsorPayloadSchema.safeParse(parsed.data);

  if (!payload.success) {
    return {
      ok: false,
      error: "validation_error",
      issues: payload.error.flatten().fieldErrors,
    };
  }

  return { ok: true, payload: payload.data };
}
