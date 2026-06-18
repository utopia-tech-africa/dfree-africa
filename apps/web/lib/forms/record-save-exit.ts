import type { LeadershipInstituteApplicationStepKey } from "@/lib/forms/leadership-institute-application-steps";

type RecordSaveExitInput = {
  step: number;
  stepKey: LeadershipInstituteApplicationStepKey;
};

export async function recordSaveExit(input: RecordSaveExitInput) {
  try {
    await fetch("/api/fellowship-applications/save-exit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      keepalive: true,
    });
  } catch {
    // Draft is saved locally; metrics are best-effort.
  }
}
