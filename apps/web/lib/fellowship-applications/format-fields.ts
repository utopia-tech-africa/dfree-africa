import {
  commitmentValues,
  cohortTermValues,
  deploymentSettingValues,
  financialLiteracyExperienceValues,
  organizationTypeValues,
  participationHistoryValues,
  referralSourceValues,
  successMetricValues,
  yearsServedValues,
} from "@/lib/forms/schemas/leadership-institute-application";

type OrganizationTypeValue = (typeof organizationTypeValues)[number];
type YearsServedValue = (typeof yearsServedValues)[number];
type FinancialLiteracyExperienceValue =
  (typeof financialLiteracyExperienceValues)[number];
type DeploymentSettingValue = (typeof deploymentSettingValues)[number];
type ParticipationHistoryValue = (typeof participationHistoryValues)[number];
type SuccessMetricValue = (typeof successMetricValues)[number];
type CohortTermValue = (typeof cohortTermValues)[number];
type CommitmentValue = (typeof commitmentValues)[number];
type ReferralSourceValue = (typeof referralSourceValues)[number];

const organizationTypeLabels: Record<OrganizationTypeValue, string> = {
  church: "Church",
  nonprofit: "Nonprofit",
  community_organization: "Community organization",
  educational: "Educational institution",
  government: "Government",
  other: "Other",
};

const yearsServedLabels: Record<YearsServedValue, string> = {
  less_than_1: "Less than 1 year",
  "1_to_3": "1–3 years",
  "3_to_5": "3–5 years",
  "5_to_10": "5–10 years",
  "10_plus": "10+ years",
};

const financialLiteracyLabels: Record<
  FinancialLiteracyExperienceValue,
  string
> = {
  led_programs: "Led Programs",
  participated: "Participated",
  both: "Both",
  informally_supported: "Informally Supported",
  no_prior_experience: "No Prior Experience",
};

const settingLabels: Record<DeploymentSettingValue, string> = {
  church: "Church",
  community_center: "Community center",
  school: "School",
  workplace: "Workplace",
  online: "Online",
  other: "Other",
};

const participationHistoryLabels: Record<ParticipationHistoryValue, string> = {
  "1_month": "1 Month",
  "2_to_3_months": "2–3 Months",
  "4_to_6_months": "4–6 Months",
  "6_plus_months": "6+ Months",
};

const successMetricLabels: Record<SuccessMetricValue, string> = {
  attendance: "Attendance",
  savings_growth: "Savings Growth",
  debt_reduction: "Debt Reduction",
  program_completion: "Program Completion",
  financial_goal_achievement: "Financial Goal Achievement",
  improved_financial_confidence: "Improved Financial Confidence",
  other: "Other",
};

const cohortTermLabels: Record<CohortTermValue, string> = {
  spring: "Spring Cohort",
  fall: "Fall Cohort",
};

const commitmentLabels: Record<CommitmentValue, string> = {
  full: "Yes — full commitment",
  mostly_with_constraints: "Mostly yes, with constraints",
  unsure: "Unsure",
};

const referralSourceLabels: Record<ReferralSourceValue, string> = {
  fellow_referral: "DFREE® fellow referral",
  website: "Website",
  social_media: "Social media",
  church: "Church",
  organization: "Organization",
  academic: "Academic",
  other: "Other",
};

function formatMappedValue<T extends string>(
  value: string | undefined | null,
  labels: Record<T, string>,
  allowed: readonly T[],
): string {
  if (!value) {
    return "—";
  }

  if ((allowed as readonly string[]).includes(value)) {
    return labels[value as T];
  }

  return value;
}

export function formatOrganizationType(value: string): string {
  return formatMappedValue(
    value,
    organizationTypeLabels,
    organizationTypeValues,
  );
}

export function formatYearsServed(value: string): string {
  return formatMappedValue(value, yearsServedLabels, yearsServedValues);
}

export function formatFinancialLiteracyExperience(value: string): string {
  return formatMappedValue(
    value,
    financialLiteracyLabels,
    financialLiteracyExperienceValues,
  );
}

export function formatDeploymentSetting(value: string): string {
  return formatMappedValue(value, settingLabels, deploymentSettingValues);
}

export function formatParticipationHistory(value: string): string {
  return formatMappedValue(
    value,
    participationHistoryLabels,
    participationHistoryValues,
  );
}

export function formatSuccessMetrics(values: string[]): string {
  if (!values.length) {
    return "—";
  }

  return values
    .map((value) =>
      formatMappedValue(value, successMetricLabels, successMetricValues),
    )
    .join(", ");
}

export function formatCohortTerm(value: string): string {
  return formatMappedValue(value, cohortTermLabels, cohortTermValues);
}

export function formatCommitment(value: string): string {
  return formatMappedValue(value, commitmentLabels, commitmentValues);
}

export function formatReferralSources(values: string[]): string {
  if (!values.length) {
    return "—";
  }

  return values
    .map((value) =>
      formatMappedValue(value, referralSourceLabels, referralSourceValues),
    )
    .join(", ");
}
