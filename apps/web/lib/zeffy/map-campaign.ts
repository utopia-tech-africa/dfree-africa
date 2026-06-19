import type { DonateCause } from "@/app/[locale]/donate/data/causes";
import { ZEFFY_GENERAL_DONATION_URL } from "./constants";
import { campaignUrlToEmbedUrl } from "./build-embed-url";
import { htmlToPlainText } from "./html-to-plain-text";
import type { ZeffyCampaign } from "./types";

const FALLBACK_BANNER_URL =
  "https://res.cloudinary.com/dan9camhs/image/upload/v1773224828/6ea76738-7c0b-4a59-9ff9-5a2b3d706604.webp";

const GENERAL_EMBED_URL =
  campaignUrlToEmbedUrl(ZEFFY_GENERAL_DONATION_URL) ??
  ZEFFY_GENERAL_DONATION_URL;

function centsToDollars(cents: number | null | undefined): number {
  if (cents == null || cents <= 0) {
    return 0;
  }

  return cents / 100;
}

function getGoalAmountCents(campaign: ZeffyCampaign): number {
  return campaign.goal_amount ?? campaign.target ?? 0;
}

function getProgressPercent(volumeCents: number, goalCents: number): number {
  if (goalCents <= 0) {
    return 0;
  }

  return Math.min(Math.round((volumeCents / goalCents) * 100), 100);
}

function getPreviewMedia(campaign: ZeffyCampaign): DonateCause["previewMedia"] {
  const imageUrl =
    campaign.banner_url ?? campaign.logo_url ?? FALLBACK_BANNER_URL;

  return {
    type: "image",
    url: imageUrl,
  };
}

function getEmbedUrl(campaign: ZeffyCampaign): string {
  const donationUrl = campaign.url ?? ZEFFY_GENERAL_DONATION_URL;
  return campaignUrlToEmbedUrl(donationUrl) ?? GENERAL_EMBED_URL;
}

function isListedCampaign(campaign: ZeffyCampaign): boolean {
  if (campaign.is_archived || campaign.deleted_at != null) {
    return false;
  }

  if (!campaign.url) {
    return false;
  }

  return true;
}

export function mapZeffyCampaignToDonateCause(
  campaign: ZeffyCampaign,
): DonateCause {
  const goalCents = getGoalAmountCents(campaign);
  const goalAmount = centsToDollars(goalCents);
  const raisedAmount = centsToDollars(campaign.volume);
  const progressPercent = getProgressPercent(campaign.volume, goalCents);
  const goalAchieved = goalCents > 0 && campaign.volume >= goalCents;
  const country = campaign.metadata.country?.trim() || undefined;
  const donationUrl = campaign.url ?? ZEFFY_GENERAL_DONATION_URL;

  return {
    id: campaign.id,
    title: htmlToPlainText(campaign.title) || campaign.title,
    description: htmlToPlainText(campaign.description),
    country,
    previewMedia: getPreviewMedia(campaign),
    isOngoing: campaign.status === "active" && !goalAchieved,
    progressPercent,
    goalAmount,
    raisedAmount,
    goalAchieved,
    donationUrl,
    embedUrl: getEmbedUrl(campaign),
    currency: campaign.currency.toUpperCase(),
    campaignType: campaign.type,
  };
}

export function mapZeffyCampaignsToDonateCauses(
  campaigns: ZeffyCampaign[],
): DonateCause[] {
  return campaigns.filter(isListedCampaign).map(mapZeffyCampaignToDonateCause);
}
