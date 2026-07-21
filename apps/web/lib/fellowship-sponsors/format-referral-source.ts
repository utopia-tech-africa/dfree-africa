import type { SponsorReferralSourceValue } from "@/lib/forms/schemas/leadership-institute-sponsor";

const referralSourceLabels: Record<SponsorReferralSourceValue, string> = {
  fellow_or_alumni: "DFREE® Fellow or alumni",
  website: "DFREE Foundation website",
  leadership: "Dr. DeForest Soaries / DFREE leadership",
  church_or_faith: "Church or faith network",
  nonprofit_network: "Nonprofit / foundation network",
  social_media: "Social media",
  corporate_csr: "Corporate giving / CSR team",
  other: "Other",
};

/** Labels for values stored before the referral-source options were updated. */
const legacyReferralSourceLabels: Record<string, string> = {
  fellow_referral: "DFREE® fellow referral",
  church: "Church",
  organization: "Organization",
  academic: "Academic",
};

export function formatSponsorReferralSource(
  value: SponsorReferralSourceValue | string | "" | undefined,
): string {
  if (!value) {
    return "—";
  }

  if (value in referralSourceLabels) {
    return referralSourceLabels[value as SponsorReferralSourceValue];
  }

  return legacyReferralSourceLabels[value] ?? value;
}
