import { z } from "zod";

import { emailField } from "@/lib/forms/schemas/common";
import { countWords } from "@/lib/forms/word-count";

const requiredText = (label: string) =>
  z.string().min(1, `${label} is required`);

const requiredSelect = <T extends readonly [string, ...string[]]>(
  values: T,
  label: string,
) =>
  z.union([z.literal(""), z.enum(values)]).refine((value) => value !== "", {
    message: `${label} is required`,
  });

export const signatureAcceptedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

export const signatureMaxBytes = 5 * 1024 * 1024;

const isSignatureFile = (value: unknown): value is File =>
  value instanceof File && value.size > 0;

const signatureFileField = z
  .unknown()
  .refine(isSignatureFile, "Signature file is required")
  .refine(
    (value) =>
      isSignatureFile(value) &&
      (signatureAcceptedMimeTypes as readonly string[]).includes(value.type),
    "Upload a PNG, JPG, WEBP, or PDF file",
  )
  .refine(
    (value) => isSignatureFile(value) && value.size <= signatureMaxBytes,
    "File must be 5MB or smaller",
  );

const wordLimited = (maxWords: number, label: string, required = true) => {
  const base = required ? requiredText(label) : z.string();

  return base.refine(
    (value) => !value.trim() || countWords(value) <= maxWords,
    `Must be ${maxWords} words or fewer`,
  );
};

export const organizationTypeValues = [
  "church",
  "nonprofit",
  "community_organization",
  "educational",
  "government",
  "other",
] as const;

export const yearsServedValues = [
  "less_than_1",
  "1_to_3",
  "3_to_5",
  "5_to_10",
  "10_plus",
] as const;

export const financialLiteracyExperienceValues = [
  "led_programs",
  "participated",
  "both",
  "informally_supported",
  "no_prior_experience",
] as const;

export const deploymentSettingValues = [
  "church",
  "community_center",
  "school",
  "workplace",
  "online",
  "other",
] as const;

export const participationHistoryValues = [
  "1_month",
  "2_to_3_months",
  "4_to_6_months",
  "6_plus_months",
] as const;

export const successMetricValues = [
  "attendance",
  "savings_growth",
  "debt_reduction",
  "program_completion",
  "financial_goal_achievement",
  "improved_financial_confidence",
  "other",
] as const;

export type SuccessMetricValue = (typeof successMetricValues)[number];

/** Column layout for success metrics checkboxes (matches application form design). */
export const successMetricsColumns = [
  ["attendance", "program_completion", "improved_financial_confidence"],
  ["savings_growth", "financial_goal_achievement", "other"],
  ["debt_reduction"],
] as const satisfies ReadonlyArray<ReadonlyArray<SuccessMetricValue>>;

export const cohortTermValues = ["spring", "fall"] as const;

export const commitmentValues = [
  "full",
  "mostly_with_constraints",
  "unsure",
] as const;

export const referralSourceValues = [
  "fellow_referral",
  "website",
  "social_media",
  "church",
  "organization",
  "academic",
  "other",
] as const;

export type ReferralSourceValue = (typeof referralSourceValues)[number];

const referenceSchema = z.object({
  fullName: requiredText("Full name"),
  relationship: requiredText("Relationship"),
  email: emailField,
  phone: requiredText("Phone"),
  organizationTitle: requiredText("Organization / title"),
});

const leadershipInstituteApplicationShape = {
  firstName: requiredText("First name"),
  lastName: requiredText("Last name"),
  email: emailField,
  phone: requiredText("Phone"),
  city: requiredText("City"),
  state: requiredText("State"),
  mailingAddress: requiredText("Mailing address"),
  currentRole: requiredText("Current role"),
  organization: requiredText("Organization"),
  organizationType: requiredSelect(organizationTypeValues, "Organization type"),
  yearsServed: requiredSelect(yearsServedValues, "Years served"),
  communityServed: requiredText("Community served"),
  organizationDescription: wordLimited(150, "Organization description", false),
  financialLiteracyExperience: requiredSelect(
    financialLiteracyExperienceValues,
    "Financial literacy experience",
  ),
  programDescription: wordLimited(150, "Program description", false),
  communityChallenges: wordLimited(150, "Community challenges"),
  motivation: wordLimited(150, "Motivation"),
  communityStory: wordLimited(150, "Community story", false),
  whoToTrain: wordLimited(150, "Who to train"),
  peopleToReach: z
    .number()
    .min(10, "Please select at least 10 people")
    .max(500, "Maximum is 500 people"),
  setting: requiredSelect(deploymentSettingValues, "Setting"),
  participationHistory: requiredSelect(
    participationHistoryValues,
    "Participation history",
  ),
  successMetrics: z
    .array(z.enum(successMetricValues))
    .min(1, "Select at least one success metric"),
  projectVision: wordLimited(150, "Project vision", false),
  reference1: referenceSchema,
  reference2: referenceSchema,
  cohortTerm: requiredSelect(cohortTermValues, "Cohort term"),
  commitment: requiredSelect(commitmentValues, "Commitment"),
  schedulingConstraints: wordLimited(150, "Scheduling constraints", false),
  referralSources: z
    .array(z.enum(referralSourceValues))
    .min(1, "Select at least one referral source"),
  signature: signatureFileField,
  signatureDate: requiredText("Date"),
} as const;

export const leadershipInstituteApplicationObjectSchema = z.object(
  leadershipInstituteApplicationShape,
);

type ApplicationRefinementData = {
  financialLiteracyExperience: string;
  programDescription: string;
  commitment: string;
  schedulingConstraints: string;
};

export function applyLeadershipInstituteApplicationRefinements<
  T extends z.ZodType<ApplicationRefinementData>,
>(schema: T) {
  return schema.superRefine((data, ctx) => {
    if (
      data.financialLiteracyExperience !== "no_prior_experience" &&
      !data.programDescription.trim()
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Program description is required",
        path: ["programDescription"],
      });
    }

    if (
      data.commitment === "mostly_with_constraints" &&
      !data.schedulingConstraints.trim()
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Please describe your constraints",
        path: ["schedulingConstraints"],
      });
    }
  });
}

export const leadershipInstituteApplicationSchema =
  applyLeadershipInstituteApplicationRefinements(
    leadershipInstituteApplicationObjectSchema,
  );

/** Application fields without the client-side signature file upload. */
export const leadershipInstituteApplicationFieldsSchema =
  applyLeadershipInstituteApplicationRefinements(
    leadershipInstituteApplicationObjectSchema.omit({ signature: true }),
  );

export type LeadershipInstituteApplicationValues = z.input<
  typeof leadershipInstituteApplicationSchema
>;

export const step1Fields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "city",
  "state",
  "mailingAddress",
  "currentRole",
  "organization",
  "organizationType",
  "yearsServed",
  "communityServed",
  "organizationDescription",
] as const satisfies readonly (keyof LeadershipInstituteApplicationValues)[];

export const step2Fields = [
  "financialLiteracyExperience",
  "programDescription",
  "communityChallenges",
  "motivation",
] as const satisfies readonly (keyof LeadershipInstituteApplicationValues)[];

export const step3Fields = [
  "communityStory",
  "whoToTrain",
  "peopleToReach",
  "setting",
  "participationHistory",
  "successMetrics",
  "projectVision",
] as const satisfies readonly (keyof LeadershipInstituteApplicationValues)[];

export const step4Fields = [
  "reference1",
  "reference2",
  "cohortTerm",
  "commitment",
  "schedulingConstraints",
  "referralSources",
] as const satisfies readonly (keyof LeadershipInstituteApplicationValues)[];

export const certificationFields = [
  "signature",
  "signatureDate",
] as const satisfies readonly (keyof LeadershipInstituteApplicationValues)[];

export const APPLICATION_FORM_STORAGE_KEY =
  "leadership-institute-application-draft";

export const defaultApplicationValues: LeadershipInstituteApplicationValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  mailingAddress: "",
  currentRole: "",
  organization: "",
  organizationType: "",
  yearsServed: "",
  communityServed: "",
  organizationDescription: "",
  financialLiteracyExperience: "",
  programDescription: "",
  communityChallenges: "",
  motivation: "",
  communityStory: "",
  whoToTrain: "",
  peopleToReach: 140,
  setting: "",
  participationHistory: "",
  successMetrics: [],
  projectVision: "",
  reference1: {
    fullName: "",
    relationship: "",
    email: "",
    phone: "",
    organizationTitle: "",
  },
  reference2: {
    fullName: "",
    relationship: "",
    email: "",
    phone: "",
    organizationTitle: "",
  },
  cohortTerm: "",
  commitment: "",
  schedulingConstraints: "",
  referralSources: [],
  signature: null,
  signatureDate: "",
};
