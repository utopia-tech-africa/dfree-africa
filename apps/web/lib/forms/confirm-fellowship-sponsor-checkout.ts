export type ConfirmFellowshipSponsorCheckoutResult =
  | { success: true; paid: true }
  | { success: true; paid: false; status: string }
  | { success: false; error: string };

export async function confirmFellowshipSponsorCheckout(
  sessionId: string,
): Promise<ConfirmFellowshipSponsorCheckoutResult> {
  try {
    const response = await fetch("/api/fellowship-sponsors/checkout/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
      paid?: boolean;
      status?: string;
      error?: string;
    } | null;

    if (!response.ok || !data?.success) {
      return {
        success: false,
        error: data?.error ?? "confirm_failed",
      };
    }

    if (data.paid) {
      return { success: true, paid: true };
    }

    return {
      success: true,
      paid: false,
      status: data.status ?? "unpaid",
    };
  } catch {
    return { success: false, error: "confirm_failed" };
  }
}
