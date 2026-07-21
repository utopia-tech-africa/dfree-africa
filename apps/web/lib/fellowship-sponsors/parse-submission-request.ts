import { leadershipInstituteSponsorSchema } from "@/lib/forms/schemas/leadership-institute-sponsor";
import {
  recognitionLogoAcceptedMimeTypes,
  recognitionLogoMaxBytes,
} from "@/lib/forms/schemas/leadership-institute-sponsor";

import {
  fellowshipSponsorPayloadSchema,
  type FellowshipSponsorPayload,
  type StoredRecognitionLogo,
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

type ParsedSponsorData = {
  ok: true;
  basePayload: FellowshipSponsorPayload;
};

export type ParseSponsorSubmissionResult = ParseSuccess | ParseFailure;

async function fileToStoredLogo(
  file: File,
): Promise<
  { ok: true; logo: StoredRecognitionLogo } | { ok: false; error: ParseFailure }
> {
  if (file.size > recognitionLogoMaxBytes) {
    return {
      ok: false,
      error: {
        ok: false,
        error: "validation_error",
        issues: {
          recognitionLogo: ["Logo file must be 20MB or smaller"],
        },
      },
    };
  }

  if (
    !(recognitionLogoAcceptedMimeTypes as readonly string[]).includes(file.type)
  ) {
    return {
      ok: false,
      error: {
        ok: false,
        error: "validation_error",
        issues: {
          recognitionLogo: ["Upload a PNG, JPG, WEBP, SVG, or PDF file"],
        },
      },
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  return {
    ok: true,
    logo: {
      fileName: file.name,
      mimeType: file.type,
      dataBase64: buffer.toString("base64"),
    },
  };
}

function parseSponsorJson(
  sponsorJson: unknown,
): ParseFailure | ParsedSponsorData {
  const parsed = leadershipInstituteSponsorSchema.safeParse(sponsorJson);

  if (!parsed.success) {
    return {
      ok: false,
      error: "validation_error",
      issues: parsed.error.flatten().fieldErrors,
    };
  }

  const basePayload = fellowshipSponsorPayloadSchema.safeParse(parsed.data);

  if (!basePayload.success) {
    return {
      ok: false,
      error: "validation_error",
      issues: basePayload.error.flatten().fieldErrors,
    };
  }

  return { ok: true, basePayload: basePayload.data };
}

export async function parseFellowshipSponsorSubmissionRequest(
  request: Request,
): Promise<ParseSponsorSubmissionResult> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    let formData: FormData;

    try {
      formData = await request.formData();
    } catch {
      return { ok: false, error: "invalid_form_data" };
    }

    const sponsorRaw = formData.get("sponsor");

    if (typeof sponsorRaw !== "string") {
      return { ok: false, error: "invalid_form_data" };
    }

    let sponsorJson: unknown;

    try {
      sponsorJson = JSON.parse(sponsorRaw);
    } catch {
      return { ok: false, error: "invalid_form_data" };
    }

    const parsedSponsor = parseSponsorJson(sponsorJson);

    if (!parsedSponsor.ok) {
      return parsedSponsor;
    }

    const logoEntry = formData.get("recognitionLogo");

    if (!(logoEntry instanceof File) || logoEntry.size === 0) {
      return { ok: true, payload: parsedSponsor.basePayload };
    }

    const storedLogo = await fileToStoredLogo(logoEntry);

    if (!storedLogo.ok) {
      return storedLogo.error;
    }

    return {
      ok: true,
      payload: {
        ...parsedSponsor.basePayload,
        recognitionLogo: storedLogo.logo,
      },
    };
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return { ok: false, error: "invalid_form_data" };
  }

  const parsedSponsor = parseSponsorJson(body);

  if (!parsedSponsor.ok) {
    return parsedSponsor;
  }

  return { ok: true, payload: parsedSponsor.basePayload };
}
