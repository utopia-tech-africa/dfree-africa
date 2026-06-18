import type { NewsletterSignupValues } from "@/lib/forms/schemas/newsletter";
import type { NewsletterSource } from "@/lib/mailchimp/tag-mapping";

export type { NewsletterSource };

export type NewsletterSubscribePayload = NewsletterSignupValues & {
  source?: NewsletterSource;
};

export type NewsletterSubscribeResult =
  | { success: true }
  | {
      success: false;
      error: "validation" | "configuration" | "subscription" | "network";
    };

type NewsletterApiSuccess = {
  success: true;
};

type NewsletterApiError = {
  success: false;
  error: string;
};

export async function subscribeToNewsletter(
  payload: NewsletterSubscribePayload,
): Promise<NewsletterSubscribeResult> {
  let response: Response;

  try {
    response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return { success: false, error: "network" };
  }

  let data: NewsletterApiSuccess | NewsletterApiError | null = null;

  try {
    data = (await response.json()) as NewsletterApiSuccess | NewsletterApiError;
  } catch {
    data = null;
  }

  if (response.ok && data?.success) {
    return { success: true };
  }

  if (response.status === 400) {
    return { success: false, error: "validation" };
  }

  if (response.status === 503) {
    return { success: false, error: "configuration" };
  }

  return { success: false, error: "subscription" };
}
