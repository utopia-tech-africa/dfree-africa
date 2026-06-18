import { NextResponse } from "next/server";

import {
  recordApplicationSaveExit,
  saveExitEventSchema,
} from "@/lib/fellowship-applications/record-save-exit";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  const parsed = saveExitEventSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "validation_error" },
      { status: 400 },
    );
  }

  try {
    const result = await recordApplicationSaveExit(parsed.data);

    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error(
      "[fellowship-applications/save-exit] Failed to record:",
      error,
    );
    return NextResponse.json(
      { success: false, error: "record_failed" },
      { status: 500 },
    );
  }
}
