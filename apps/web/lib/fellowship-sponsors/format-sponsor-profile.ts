import type {
  PublicStatementSharingValue,
  SponsorTypeValue,
} from "@/lib/forms/schemas/leadership-institute-sponsor";

const sponsorTypeLabels: Record<SponsorTypeValue, string> = {
  individual: "Individual",
  corporation: "Corporation",
  foundation: "Foundation",
  nonprofit: "Nonprofit",
  faith_based: "Faith-based organization",
  government: "Government",
  other: "Other",
};

const publicStatementLabels: Record<PublicStatementSharingValue, string> = {
  yes: "Yes",
  yes_confidential: "Yes (Keep my name confidential)",
  no: "No",
};

export function formatSponsorType(value: string): string {
  if (value in sponsorTypeLabels) {
    return sponsorTypeLabels[value as SponsorTypeValue];
  }

  return value;
}

export function formatPublicStatementSharing(value: string): string {
  if (value in publicStatementLabels) {
    return publicStatementLabels[value as PublicStatementSharingValue];
  }

  return value;
}
