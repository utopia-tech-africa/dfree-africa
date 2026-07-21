import { NextResponse } from "next/server";
import { z } from "zod";

import { markFellowshipSponsorCheckoutCancelled } from "@/lib/fellowship-sponsors/payment";

const cancelSchema = z.object({
  submissionId: z.string().min(1),
  cancelToken: z.string().min(1),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_form_data" },
      { status: 400 },
    );
  }

  const parsed = cancelSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "validation_error" },
      { status: 400 },
    );
  }

  try {
    const result = await markFellowshipSponsorCheckoutCancelled(
      parsed.data.submissionId,
      { cancelToken: parsed.data.cancelToken },
    );

    if (!result.ok) {
      const status = result.error === "unauthorized" ? 403 : 404;
      return NextResponse.json(
        { success: false, error: result.error },
        { status },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "[fellowship-sponsors/checkout/cancel] Failed to cancel:",
      error,
    );
    return NextResponse.json(
      { success: false, error: "cancel_failed" },
      { status: 500 },
    );
  }
}
