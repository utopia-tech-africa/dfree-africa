export const sponsorCohortValues = [
  "fall_2026",
  "winter_2026",
  "spring_2027",
  "summer_2027",
] as const;

export type SponsorCohortValue = (typeof sponsorCohortValues)[number];
