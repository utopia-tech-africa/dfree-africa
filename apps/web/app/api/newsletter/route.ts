import { NextResponse } from "next/server";
import { z } from "zod";

import { subscribeMemberToMailchimp } from "@/lib/mailchimp/subscribe-member";
import { newsletterSignupSchema } from "@/lib/forms/schemas/newsletter";

const newsletterSubscribeRequestSchema = newsletterSignupSchema.extend({
  source: z.enum(["footer", "contact"]).optional(),
});

export async function POST(request: Request) {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = newsletterSubscribeRequestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "validation_error",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, source } = parsed.data;
  const result = await subscribeMemberToMailchimp({ name, email, source });

  if (!result.ok) {
    if (result.reason === "not_configured") {
      console.error("[newsletter] Mailchimp is not configured");
      return NextResponse.json(
        { success: false, error: "not_configured" },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { success: false, error: "subscription_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
