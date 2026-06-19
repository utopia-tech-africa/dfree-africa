import {
  formatSponsorshipCurrency,
  getFellowCount,
  getSponsorshipTotal,
} from "@/lib/fellowship-sponsors/sponsorship-pricing";
import type {
  PresetSponsorshipTierValue,
  SponsorshipTierValue,
} from "@/lib/forms/schemas/leadership-institute-sponsor";

const tierLabels: Record<PresetSponsorshipTierValue, string> = {
  community: "Community — $10,500",
  champion: "Champion — $31,500",
  catalyst: "Catalyst — $52,500",
  legacy: "Legacy — $210,500",
};

export function formatSponsorshipTier(
  tier: string,
  customFellowCount = 1,
): string {
  if (tier === "custom") {
    const count = getFellowCount("custom", customFellowCount);
    const total = getSponsorshipTotal("custom", customFellowCount);
    const fellowLabel = count === 1 ? "1 Fellow" : `${count} Fellows`;

    return `Custom — ${fellowLabel} — ${formatSponsorshipCurrency(total)}`;
  }

  if (tier in tierLabels) {
    return tierLabels[tier as PresetSponsorshipTierValue];
  }

  return tier;
}

export function formatSponsorshipAmount(
  tier: SponsorshipTierValue,
  customFellowCount: number,
): string {
  return formatSponsorshipCurrency(
    getSponsorshipTotal(tier, customFellowCount),
  );
}

export function formatSponsorshipFellows(
  tier: SponsorshipTierValue,
  customFellowCount: number,
): string {
  const count = getFellowCount(tier, customFellowCount);

  if (tier === "legacy") {
    return "Funds a full cohort of 20 Fellows";
  }

  if (count === 1) {
    return "Funds 1 DFREE® Fellow";
  }

  return `Funds ${count} DFREE® Fellows`;
}
