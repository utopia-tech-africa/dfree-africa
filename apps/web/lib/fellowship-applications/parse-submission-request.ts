import {
  leadershipInstituteApplicationFieldsSchema,
  signatureAcceptedMimeTypes,
  signatureMaxBytes,
} from "@/lib/forms/schemas/leadership-institute-application";

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
  error: "invalid_form_data" | "validation_error" | "invalid_signature";
  issues?: Record<string, string[]>;
};

export type ParseSubmissionResult = ParseSuccess | ParseFailure;

function isSignatureFile(value: unknown): value is File {
  return value instanceof File && value.size > 0;
}

async function fileToStoredSignature(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return {
    fileName: file.name,
    mimeType: file.type as (typeof signatureAcceptedMimeTypes)[number],
    dataBase64: buffer.toString("base64"),
  };
}

export async function parseFellowshipSubmissionRequest(
  formData: FormData,
): Promise<ParseSubmissionResult> {
  const applicationRaw = formData.get("application");
  const signatureFile = formData.get("signature");

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
    leadershipInstituteApplicationFieldsSchema.safeParse(applicationJson);

  if (!parsedApplication.success) {
    return {
      ok: false,
      error: "validation_error",
      issues: parsedApplication.error.flatten().fieldErrors,
    };
  }

  if (!isSignatureFile(signatureFile)) {
    return { ok: false, error: "invalid_signature" };
  }

  if (
    !(signatureAcceptedMimeTypes as readonly string[]).includes(
      signatureFile.type,
    )
  ) {
    return { ok: false, error: "invalid_signature" };
  }

  if (signatureFile.size > signatureMaxBytes) {
    return { ok: false, error: "invalid_signature" };
  }

  const storedSignature = await fileToStoredSignature(signatureFile);

  const payload = fellowshipApplicationPayloadSchema.safeParse({
    ...parsedApplication.data,
    signature: storedSignature,
  });

  if (!payload.success) {
    return {
      ok: false,
      error: "validation_error",
      issues: payload.error.flatten().fieldErrors,
    };
  }

  return { ok: true, payload: payload.data };
}
