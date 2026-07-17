import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";

const SUBMISSION_TIMEOUT_MS = 60_000;

type SubmitResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function submitFellowshipSponsor(
  data: LeadershipInstituteSponsorValues,
  recognitionLogoFile?: File | null,
): Promise<SubmitResult> {
  const formData = new FormData();
  formData.append("sponsor", JSON.stringify(data));

  if (recognitionLogoFile && recognitionLogoFile.size > 0) {
    formData.append("recognitionLogo", recognitionLogoFile);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), SUBMISSION_TIMEOUT_MS);

  try {
    const response = await fetch("/api/fellowship-sponsors", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    let body: { success?: boolean; id?: string; error?: string } = {};

    try {
      body = (await response.json()) as typeof body;
    } catch {
      return { success: false, error: "submission_failed" };
    }

    if (!response.ok || !body.success || !body.id) {
      return {
        success: false,
        error: body.error ?? "submission_failed",
      };
    }

    return { success: true, id: body.id };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { success: false, error: "submission_timeout" };
    }

    return { success: false, error: "submission_failed" };
  } finally {
    clearTimeout(timeoutId);
  }
}
