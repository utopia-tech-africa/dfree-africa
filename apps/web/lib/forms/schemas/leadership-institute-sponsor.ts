import { z } from "zod";

import { MAX_CUSTOM_FELLOW_COUNT } from "@/lib/fellowship-sponsors/sponsorship-pricing";
import { sponsorCohortValues } from "@/lib/fellowship-sponsors/sponsor-cohorts";
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

export const recognitionPreferenceValues = [
  "cohort_program_listing",
  "website_recognition",
  "social_media_spotlight",
  "annual_impact_report",
  "orientation_invitation",
  "capstone_showcase_invitation",
  "fellow_introduction",
  "logo_placement",
] as const;

export type RecognitionPreferenceValue =
  (typeof recognitionPreferenceValues)[number];

export const paymentMethodValues = [
  "check_ach",
  "credit_card",
  "wire_transfer",
  "pledge_invoice",
] as const;

export type PaymentMethodValue = (typeof paymentMethodValues)[number];

export const sponsorReferralSourceValues = [
  "fellow_or_alumni",
  "website",
  "leadership",
  "church_or_faith",
  "nonprofit_network",
  "social_media",
  "corporate_csr",
  "other",
] as const;

export type SponsorReferralSourceValue =
  (typeof sponsorReferralSourceValues)[number];

export const recognitionLogoAcceptedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/pdf",
] as const;

export const recognitionLogoMaxBytes = 20 * 1024 * 1024;

export const leadershipInstituteSponsorObjectSchema = z.object({
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
  customFellowCount: z
    .number()
    .int()
    .min(1, "At least 1 fellow is required")
    .max(
      MAX_CUSTOM_FELLOW_COUNT,
      `At most ${MAX_CUSTOM_FELLOW_COUNT} fellows are allowed`,
    ),
  namedScholarshipTitle: z
    .string()
    .max(200, "Title must be 200 characters or fewer")
    .optional()
    .or(z.literal("")),
  sponsorCohort: requiredSelect(sponsorCohortValues, "Cohort"),
  cohortAssignmentNotes: wordLimited(150, "Cohort assignment notes", false),
  recognitionPreferences: z
    .array(z.enum(recognitionPreferenceValues))
    .default([]),
  recognitionDisplayName: z
    .string()
    .max(200, "Name must be 200 characters or fewer")
    .optional()
    .or(z.literal("")),
  paymentMethod: z.enum(paymentMethodValues).default("check_ach"),
  checkNumber: z
    .string()
    .max(100, "Check number must be 100 characters or fewer")
    .optional()
    .or(z.literal("")),
  anticipatedWireDate: z.string().optional().or(z.literal("")),
  invoiceRecipientName: z
    .string()
    .max(200, "Name must be 200 characters or fewer")
    .optional()
    .or(z.literal("")),
  invoiceEmail: z.union([z.literal(""), emailField]),
  purchaseOrderNumber: z
    .string()
    .max(100, "Purchase order number must be 100 characters or fewer")
    .optional()
    .or(z.literal("")),
  requestedPaymentDate: z.string().optional().or(z.literal("")),
  specialBillingInstructions: wordLimited(
    150,
    "Special billing instructions",
    false,
  ),
  referralSource: requiredSelect(
    sponsorReferralSourceValues,
    "How did you hear about us",
  ),
});

export const leadershipInstituteSponsorSchema =
  leadershipInstituteSponsorObjectSchema.superRefine((data, ctx) => {
    if (data.paymentMethod !== "pledge_invoice") {
      return;
    }

    if (!data.invoiceRecipientName?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Invoice recipient name is required",
        path: ["invoiceRecipientName"],
      });
    }

    if (!data.invoiceEmail?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Invoice email is required",
        path: ["invoiceEmail"],
      });
    }
  });

export type LeadershipInstituteSponsorValues = z.input<
  typeof leadershipInstituteSponsorObjectSchema
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
  recognitionPreferences: [],
  recognitionDisplayName: "",
  paymentMethod: "check_ach",
  checkNumber: "",
  anticipatedWireDate: "",
  invoiceRecipientName: "",
  invoiceEmail: "",
  purchaseOrderNumber: "",
  requestedPaymentDate: "",
  specialBillingInstructions: "",
  referralSource: "",
};
