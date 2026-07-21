import type {
  PresetSponsorshipTierValue,
  SponsorshipTierValue,
} from "@/lib/forms/schemas/leadership-institute-sponsor";

export const FELLOW_UNIT_PRICE = 10_500;

/** Upper bound for custom fellow counts to keep Checkout amounts bounded. */
export const MAX_CUSTOM_FELLOW_COUNT = 100;

export const TIER_FELLOW_COUNTS: Record<PresetSponsorshipTierValue, number> = {
  community: 1,
  champion: 3,
  catalyst: 5,
  legacy: 20,
};

export function getPresetTierForFellowCount(
  fellowCount: number,
): PresetSponsorshipTierValue | null {
  const entries = Object.entries(TIER_FELLOW_COUNTS) as [
    PresetSponsorshipTierValue,
    number,
  ][];

  for (const [tier, count] of entries) {
    if (count === fellowCount) {
      return tier;
    }
  }

  return null;
}

export function formatSponsorshipCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getFellowCount(
  tier: SponsorshipTierValue,
  customFellowCount: number,
): number {
  if (tier === "custom") {
    return customFellowCount;
  }

  return TIER_FELLOW_COUNTS[tier];
}

export function getSponsorshipTotal(
  tier: SponsorshipTierValue,
  customFellowCount: number,
): number {
  return getFellowCount(tier, customFellowCount) * FELLOW_UNIT_PRICE;
}

export function getSponsorshipAmountCents(
  tier: SponsorshipTierValue,
  customFellowCount: number,
): number {
  return getSponsorshipTotal(tier, customFellowCount) * 100;
}
