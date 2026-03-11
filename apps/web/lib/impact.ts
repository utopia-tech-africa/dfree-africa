export const IMPACT_STAT_KEYS = [
  "completedProjects",
  "livesImpacted",
  "debtCleared",
  "youngPeopleTrained",
] as const;

export type ImpactStatKey = (typeof IMPACT_STAT_KEYS)[number];
