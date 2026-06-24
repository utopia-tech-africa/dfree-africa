import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";

export const LEADERSHIP_INSTITUTE_SPONSOR_STEPS = [
  "sponsorshipDetails",
  "sponsorInformation",
  "recognitionPayment",
] as const;

export type LeadershipInstituteSponsorStepKey =
  (typeof LEADERSHIP_INSTITUTE_SPONSOR_STEPS)[number];

export const SPONSOR_TOTAL_STEPS = LEADERSHIP_INSTITUTE_SPONSOR_STEPS.length;

export const sponsorStep1Fields = [
  "sponsorshipTier",
  "customFellowCount",
  "namedScholarshipTitle",
  "sponsorCohort",
  "cohortAssignmentNotes",
] as const satisfies ReadonlyArray<keyof LeadershipInstituteSponsorValues>;

export const sponsorStep2Fields = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "city",
  "state",
  "mailingAddress",
  "currentRole",
  "organization",
  "sponsorType",
  "sponsorWhy",
  "communitiesToSupport",
  "publicStatementSharing",
] as const satisfies ReadonlyArray<keyof LeadershipInstituteSponsorValues>;

export const sponsorStep3Fields = ["message"] as const satisfies ReadonlyArray<
  keyof LeadershipInstituteSponsorValues
>;

export const sponsorStepFieldMap = [
  sponsorStep1Fields,
  sponsorStep2Fields,
  sponsorStep3Fields,
] as const;

export function getLeadershipInstituteSponsorStepKey(step: number) {
  return LEADERSHIP_INSTITUTE_SPONSOR_STEPS[step - 1];
}
