import type { ZeffyCampaignType } from "@/lib/zeffy/types";

export type DonateCause = {
  id: string;
  title: string;
  description: string;
  country?: string;
  previewMedia: {
    type: "image" | "video";
    url: string;
  };
  isOngoing: boolean;
  progressPercent: number;
  goalAmount: number;
  raisedAmount?: number;
  goalAchieved: boolean;
  donationUrl: string;
  embedUrl: string;
  currency?: string;
  campaignType?: ZeffyCampaignType;
};

export const donateCauses: DonateCause[] = [];
