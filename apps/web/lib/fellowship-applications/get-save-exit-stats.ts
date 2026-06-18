import {
  LEADERSHIP_INSTITUTE_APPLICATION_STEPS,
  LEADERSHIP_INSTITUTE_APPLICATION_STEP_LABELS,
  type LeadershipInstituteApplicationStepKey,
} from "@/lib/forms/leadership-institute-application-steps";
import { prisma } from "@/lib/db/prisma";

export type SaveExitStepStat = {
  step: number;
  stepKey: LeadershipInstituteApplicationStepKey;
  label: string;
  count: number;
};

export type SaveExitStats = {
  total: number;
  byStep: SaveExitStepStat[];
};

export async function getSaveExitStats(): Promise<SaveExitStats> {
  const [total, grouped] = await Promise.all([
    prisma.applicationSaveExitEvent.count(),
    prisma.applicationSaveExitEvent.groupBy({
      by: ["step", "stepKey"],
      _count: { _all: true },
      orderBy: { step: "asc" },
    }),
  ]);

  const countByStep = new Map(
    grouped.map((row) => [row.step, row._count._all]),
  );

  const byStep = LEADERSHIP_INSTITUTE_APPLICATION_STEPS.map(
    (stepKey, index) => {
      const step = index + 1;

      return {
        step,
        stepKey,
        label: LEADERSHIP_INSTITUTE_APPLICATION_STEP_LABELS[stepKey],
        count: countByStep.get(step) ?? 0,
      };
    },
  );

  return { total, byStep };
}
