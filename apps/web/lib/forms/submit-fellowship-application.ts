import type { LeadershipInstituteApplicationValues } from "@/lib/forms/schemas/leadership-institute-application";

const SUBMISSION_TIMEOUT_MS = 60_000;

type SubmitResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function submitFellowshipApplication(
  data: LeadershipInstituteApplicationValues,
): Promise<SubmitResult> {
  const { signature, ...application } = data;

  if (!(signature instanceof File)) {
    return { success: false, error: "invalid_signature" };
  }

  const formData = new FormData();
  formData.append("application", JSON.stringify(application));
  formData.append("signature", signature);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), SUBMISSION_TIMEOUT_MS);

  try {
    const response = await fetch("/api/fellowship-applications", {
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
