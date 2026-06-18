export const LEADERSHIP_INSTITUTE_APPLICATION_STEPS = [
  "aboutYou",
  "communityImpact",
  "deploymentVision",
  "reviewSubmit",
] as const;

export type LeadershipInstituteApplicationStepKey =
  (typeof LEADERSHIP_INSTITUTE_APPLICATION_STEPS)[number];

export const LEADERSHIP_INSTITUTE_APPLICATION_STEP_LABELS: Record<
  LeadershipInstituteApplicationStepKey,
  string
> = {
  aboutYou: "About You & Your Work",
  communityImpact: "Community Impact",
  deploymentVision: "Deployment Vision",
  reviewSubmit: "Review & Submit",
};

export function getLeadershipInstituteApplicationStepKey(step: number) {
  return LEADERSHIP_INSTITUTE_APPLICATION_STEPS[step - 1];
}
