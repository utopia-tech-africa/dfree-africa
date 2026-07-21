import {
  formatCohortTerm,
  formatCommitment,
  formatDeploymentSetting,
  formatFinancialLiteracyExperience,
  formatOrganizationType,
  formatParticipationHistory,
  formatReferralSources,
  formatSuccessMetrics,
  formatYearsServed,
} from "./format-fields";
import { formatFellowshipApplicationReviewStatus } from "./review-status";
import type { FellowshipApplicationPayload } from "./types";

type ExportRow = {
  id: string;
  createdAt: Date;
  acknowledgementSentAt: Date | null;
  reviewStatus: string;
  reviewedAt: Date | null;
  payload: FellowshipApplicationPayload;
};

const CSV_HEADERS = [
  "Application ID",
  "Submitted at",
  "Review status",
  "Reviewed at",
  "Acknowledgement sent at",
  "First name",
  "Last name",
  "Email",
  "Phone",
  "City",
  "State",
  "Mailing address",
  "Current role",
  "Organization",
  "Organization type",
  "Years served",
  "Community served",
  "Organization description",
  "Financial literacy experience",
  "Program description",
  "Community challenges",
  "Motivation",
  "Community story",
  "Who to train",
  "People to reach",
  "Setting",
  "Project timeline",
  "Success metrics",
  "Project vision",
  "Reference 1 name",
  "Reference 1 relationship",
  "Reference 1 email",
  "Reference 1 phone",
  "Reference 1 organization / title",
  "Reference 2 name",
  "Reference 2 relationship",
  "Reference 2 email",
  "Reference 2 phone",
  "Reference 2 organization / title",
  "Cohort",
  "Commitment",
  "Scheduling constraints",
  "Referral sources",
  "Signature",
  "Signature date",
] as const;

function escapeCsvCell(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }

  return value;
}

function cell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return "";
  }

  return escapeCsvCell(String(value));
}

function formatDate(value: Date | null): string {
  if (!value) {
    return "";
  }

  return value.toISOString();
}

function rowValues(row: ExportRow): string[] {
  const { payload } = row;

  return [
    cell(row.id),
    cell(formatDate(row.createdAt)),
    cell(formatFellowshipApplicationReviewStatus(row.reviewStatus)),
    cell(formatDate(row.reviewedAt)),
    cell(formatDate(row.acknowledgementSentAt)),
    cell(payload.firstName),
    cell(payload.lastName),
    cell(payload.email),
    cell(payload.phone),
    cell(payload.city),
    cell(payload.state),
    cell(payload.mailingAddress),
    cell(payload.currentRole),
    cell(payload.organization),
    cell(formatOrganizationType(payload.organizationType)),
    cell(formatYearsServed(payload.yearsServed)),
    cell(payload.communityServed),
    cell(payload.organizationDescription),
    cell(
      formatFinancialLiteracyExperience(payload.financialLiteracyExperience),
    ),
    cell(payload.programDescription),
    cell(payload.communityChallenges),
    cell(payload.motivation),
    cell(payload.communityStory),
    cell(payload.whoToTrain),
    cell(payload.peopleToReach),
    cell(formatDeploymentSetting(payload.setting)),
    cell(formatParticipationHistory(payload.participationHistory)),
    cell(formatSuccessMetrics(payload.successMetrics)),
    cell(payload.projectVision),
    cell(payload.reference1.fullName),
    cell(payload.reference1.relationship),
    cell(payload.reference1.email),
    cell(payload.reference1.phone),
    cell(payload.reference1.organizationTitle),
    cell(payload.reference2.fullName),
    cell(payload.reference2.relationship),
    cell(payload.reference2.email),
    cell(payload.reference2.phone),
    cell(payload.reference2.organizationTitle),
    cell(formatCohortTerm(payload.cohortTerm)),
    cell(formatCommitment(payload.commitment)),
    cell(payload.schedulingConstraints),
    cell(formatReferralSources(payload.referralSources)),
    cell(
      typeof payload.signature === "string"
        ? payload.signature
        : payload.signature.fileName,
    ),
    cell(payload.signatureDate),
  ];
}

export function buildFellowshipApplicationsCsv(rows: ExportRow[]): string {
  const lines = [
    CSV_HEADERS.join(","),
    ...rows.map((row) => rowValues(row).join(",")),
  ];

  return `\uFEFF${lines.join("\n")}`;
}
