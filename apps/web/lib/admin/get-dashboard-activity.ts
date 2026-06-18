import { FELLOWSHIP_APPLICATION_TYPE } from "@/lib/fellowship-applications/constants";
import { prisma } from "@/lib/db/prisma";

export type DashboardActivityPoint = {
  dateKey: string;
  label: string;
  applications: number;
  saveExits: number;
};

const DAY_MS = 1000 * 60 * 60 * 24;

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function toDateKey(date: Date) {
  return startOfDay(date).toISOString().slice(0, 10);
}

function formatDayLabel(date: Date, dayCount: number) {
  if (dayCount <= 7) {
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function buildDayRange(dayCount: number) {
  const today = startOfDay(new Date());
  const days: Date[] = [];

  for (let offset = dayCount - 1; offset >= 0; offset -= 1) {
    days.push(new Date(today.getTime() - offset * DAY_MS));
  }

  return days;
}

export async function getDashboardActivity(
  dayCount = 14,
): Promise<DashboardActivityPoint[]> {
  const days = buildDayRange(dayCount);
  const rangeStart = days[0];

  if (!rangeStart) {
    return [];
  }

  const [applications, saveExits] = await Promise.all([
    prisma.formSubmission.findMany({
      where: {
        type: FELLOWSHIP_APPLICATION_TYPE,
        createdAt: { gte: rangeStart },
      },
      select: { createdAt: true },
    }),
    prisma.applicationSaveExitEvent.findMany({
      where: {
        createdAt: { gte: rangeStart },
      },
      select: { createdAt: true },
    }),
  ]);

  const applicationCounts = new Map<string, number>();
  const saveExitCounts = new Map<string, number>();

  for (const submission of applications) {
    const key = toDateKey(submission.createdAt);
    applicationCounts.set(key, (applicationCounts.get(key) ?? 0) + 1);
  }

  for (const event of saveExits) {
    const key = toDateKey(event.createdAt);
    saveExitCounts.set(key, (saveExitCounts.get(key) ?? 0) + 1);
  }

  return days.map((day) => {
    const dateKey = toDateKey(day);

    return {
      dateKey,
      label: formatDayLabel(day, dayCount),
      applications: applicationCounts.get(dateKey) ?? 0,
      saveExits: saveExitCounts.get(dateKey) ?? 0,
    };
  });
}
