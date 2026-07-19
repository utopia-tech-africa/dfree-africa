import type { SponsorReferralSourceValue } from "@/lib/forms/schemas/leadership-institute-sponsor";

const referralSourceLabels: Record<SponsorReferralSourceValue, string> = {
  fellow_referral: "DFREE® fellow referral",
  website: "Website",
  social_media: "Social media",
  church: "Church",
  organization: "Organization",
  academic: "Academic",
  other: "Other",
};

export function formatSponsorReferralSource(
  value: SponsorReferralSourceValue | "" | undefined,
): string {
  if (!value) {
    return "—";
  }

  return referralSourceLabels[value];
}
