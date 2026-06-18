import { z } from "zod";

import {
  LEADERSHIP_INSTITUTE_APPLICATION_STEPS,
  getLeadershipInstituteApplicationStepKey,
} from "@/lib/forms/leadership-institute-application-steps";
import { prisma } from "@/lib/db/prisma";

export const saveExitEventSchema = z.object({
  step: z
    .number()
    .int()
    .min(1)
    .max(LEADERSHIP_INSTITUTE_APPLICATION_STEPS.length),
  stepKey: z.enum(LEADERSHIP_INSTITUTE_APPLICATION_STEPS),
});

export type SaveExitEventInput = z.infer<typeof saveExitEventSchema>;

export async function recordApplicationSaveExit(input: SaveExitEventInput) {
  const expectedStepKey = getLeadershipInstituteApplicationStepKey(input.step);

  if (!expectedStepKey || expectedStepKey !== input.stepKey) {
    return { ok: false as const, error: "invalid_step" as const };
  }

  const event = await prisma.applicationSaveExitEvent.create({
    data: {
      step: input.step,
      stepKey: input.stepKey,
    },
  });

  return { ok: true as const, id: event.id };
}
