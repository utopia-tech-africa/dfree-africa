import type { SponsorCohortValue } from "@/lib/fellowship-sponsors/sponsor-cohorts";

const cohortLabels: Record<SponsorCohortValue, string> = {
  fall_2026: "Fall 2026",
  winter_2026: "Winter 2026",
  spring_2027: "Spring 2027",
  summer_2027: "Summer 2027",
};

export function formatSponsorCohort(cohort: string): string {
  if (cohort in cohortLabels) {
    return cohortLabels[cohort as SponsorCohortValue];
  }

  return cohort;
}
