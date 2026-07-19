import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";

const CHECKOUT_TIMEOUT_MS = 60_000;

type CheckoutResult =
  | { success: true; id: string; checkoutUrl: string }
  | { success: false; error: string };

export async function startFellowshipSponsorCheckout(
  data: LeadershipInstituteSponsorValues,
  options: {
    recognitionLogoFile?: File | null;
    locale: string;
  },
): Promise<CheckoutResult> {
  const formData = new FormData();
  formData.append("sponsor", JSON.stringify(data));

  if (options.recognitionLogoFile && options.recognitionLogoFile.size > 0) {
    formData.append("recognitionLogo", options.recognitionLogoFile);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CHECKOUT_TIMEOUT_MS);

  try {
    const response = await fetch(
      `/api/fellowship-sponsors/checkout?locale=${encodeURIComponent(options.locale)}`,
      {
        method: "POST",
        body: formData,
        signal: controller.signal,
      },
    );

    let body: {
      success?: boolean;
      id?: string;
      checkoutUrl?: string;
      error?: string;
    } = {};

    try {
      body = (await response.json()) as typeof body;
    } catch {
      return { success: false, error: "checkout_failed" };
    }

    if (!response.ok || !body.success || !body.id || !body.checkoutUrl) {
      return {
        success: false,
        error: body.error ?? "checkout_failed",
      };
    }

    return {
      success: true,
      id: body.id,
      checkoutUrl: body.checkoutUrl,
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { success: false, error: "checkout_timeout" };
    }

    return { success: false, error: "checkout_failed" };
  } finally {
    clearTimeout(timeoutId);
  }
}
