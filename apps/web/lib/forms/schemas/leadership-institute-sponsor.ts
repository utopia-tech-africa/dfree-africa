import { z } from "zod";

import { emailField } from "@/lib/forms/schemas/common";
import { sponsorCohortValues } from "@/lib/fellowship-sponsors/sponsor-cohorts";
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

const optionalSelect = <T extends readonly [string, ...string[]]>(values: T) =>
  z.union([z.literal(""), z.enum(values)]);

const wordLimited = (maxWords: number, label: string, required = true) => {
  const base = required ? requiredText(label) : z.string();

  return base.refine(
    (value) => !value.trim() || countWords(value) <= maxWords,
    `Must be ${maxWords} words or fewer`,
  );
};

export const sponsorTypeValues = [
  "individual",
  "corporation",
  "foundation",
  "nonprofit",
  "faith_based",
  "government",
  "other",
] as const;

export type SponsorTypeValue = (typeof sponsorTypeValues)[number];

export const publicStatementSharingValues = [
  "yes",
  "yes_confidential",
  "no",
] as const;

export type PublicStatementSharingValue =
  (typeof publicStatementSharingValues)[number];

export const presetSponsorshipTierValues = [
  "community",
  "champion",
  "catalyst",
  "legacy",
] as const;

export type PresetSponsorshipTierValue =
  (typeof presetSponsorshipTierValues)[number];

export const sponsorshipTierValues = [
  ...presetSponsorshipTierValues,
  "custom",
] as const;

export type SponsorshipTierValue = (typeof sponsorshipTierValues)[number];

export const leadershipInstituteSponsorSchema = z.object({
  firstName: requiredText("First name"),
  lastName: requiredText("Last name"),
  email: emailField,
  phone: requiredText("Phone"),
  city: requiredText("City"),
  state: requiredText("State"),
  mailingAddress: requiredText("Mailing address"),
  currentRole: requiredText("Current role"),
  organization: requiredText("Organization"),
  sponsorType: optionalSelect(sponsorTypeValues),
  sponsorWhy: wordLimited(150, "Sponsor motivation", false),
  communitiesToSupport: wordLimited(150, "Communities to support", false),
  publicStatementSharing: optionalSelect(publicStatementSharingValues),
  sponsorshipTier: requiredSelect(sponsorshipTierValues, "Sponsorship level"),
  customFellowCount: z.number().int().min(1, "At least 1 fellow is required"),
  namedScholarshipTitle: z
    .string()
    .max(200, "Title must be 200 characters or fewer")
    .optional()
    .or(z.literal("")),
  sponsorCohort: requiredSelect(sponsorCohortValues, "Cohort"),
  cohortAssignmentNotes: wordLimited(150, "Cohort assignment notes", false),
  message: z
    .string()
    .max(1500, "Message must be 1500 characters or fewer")
    .optional()
    .or(z.literal("")),
});

export type LeadershipInstituteSponsorValues = z.input<
  typeof leadershipInstituteSponsorSchema
>;

export const defaultSponsorValues: LeadershipInstituteSponsorValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  mailingAddress: "",
  currentRole: "",
  organization: "",
  sponsorType: "",
  sponsorWhy: "",
  communitiesToSupport: "",
  publicStatementSharing: "",
  sponsorshipTier: "community",
  customFellowCount: 1,
  namedScholarshipTitle: "",
  sponsorCohort: "",
  cohortAssignmentNotes: "",
  message: "",
};
