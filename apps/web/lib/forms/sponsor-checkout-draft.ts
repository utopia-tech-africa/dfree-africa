import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";

export const SPONSOR_CHECKOUT_DRAFT_KEY = "leadership-institute-sponsor-draft";

const LOGO_DRAFT_MAX_BYTES = 4 * 1024 * 1024;

export type SponsorCheckoutDraftLogo = {
  fileName: string;
  mimeType: string;
  dataBase64: string;
};

export type SponsorCheckoutDraft = {
  values: LeadershipInstituteSponsorValues;
  currentStep: number;
  logo?: SponsorCheckoutDraftLogo;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseSponsorCheckoutDraft(
  raw: string,
): SponsorCheckoutDraft | null {
  try {
    const parsed: unknown = JSON.parse(raw);

    if (!isRecord(parsed) || !isRecord(parsed.values)) {
      return null;
    }

    const currentStep =
      typeof parsed.currentStep === "number" &&
      Number.isFinite(parsed.currentStep)
        ? parsed.currentStep
        : 3;

    const draft: SponsorCheckoutDraft = {
      values: parsed.values as LeadershipInstituteSponsorValues,
      currentStep,
    };

    if (isRecord(parsed.logo)) {
      const { fileName, mimeType, dataBase64 } = parsed.logo;
      if (
        typeof fileName === "string" &&
        typeof mimeType === "string" &&
        typeof dataBase64 === "string" &&
        fileName &&
        mimeType &&
        dataBase64
      ) {
        draft.logo = { fileName, mimeType, dataBase64 };
      }
    }

    return draft;
  } catch {
    return null;
  }
}

export async function logoFileToDraft(
  file: File,
): Promise<SponsorCheckoutDraftLogo | undefined> {
  if (file.size > LOGO_DRAFT_MAX_BYTES) {
    return undefined;
  }

  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return {
    fileName: file.name,
    mimeType: file.type || "application/octet-stream",
    dataBase64: btoa(binary),
  };
}

export function draftLogoToFile(logo: SponsorCheckoutDraftLogo): File {
  const binary = atob(logo.dataBase64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new File([bytes], logo.fileName, { type: logo.mimeType });
}

export function saveSponsorCheckoutDraft(draft: SponsorCheckoutDraft): void {
  sessionStorage.setItem(SPONSOR_CHECKOUT_DRAFT_KEY, JSON.stringify(draft));
}

export function loadSponsorCheckoutDraft(): SponsorCheckoutDraft | null {
  const raw = sessionStorage.getItem(SPONSOR_CHECKOUT_DRAFT_KEY);
  if (!raw) {
    return null;
  }

  const draft = parseSponsorCheckoutDraft(raw);
  if (!draft) {
    sessionStorage.removeItem(SPONSOR_CHECKOUT_DRAFT_KEY);
  }

  return draft;
}

export function clearSponsorCheckoutDraft(): void {
  sessionStorage.removeItem(SPONSOR_CHECKOUT_DRAFT_KEY);
}
