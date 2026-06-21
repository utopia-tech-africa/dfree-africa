import {
  ZEFFY_API_BASE_URL,
  ZEFFY_CAMPAIGNS_REVALIDATE_SECONDS,
} from "./constants";
import { getZeffyConfig } from "./config";
import type { ZeffyCampaign, ZeffyCampaignList } from "./types";

type ListCampaignsPageOptions = {
  limit?: number;
  startingAfter?: string;
};

async function listZeffyCampaignsPage(
  options: ListCampaignsPageOptions = {},
): Promise<ZeffyCampaignList | null> {
  const config = getZeffyConfig();

  if (!config) {
    return null;
  }

  const params = new URLSearchParams();
  const limit = options.limit ?? 100;
  params.set("limit", String(limit));

  if (options.startingAfter) {
    params.set("starting_after", options.startingAfter);
  }

  const response = await fetch(
    `${ZEFFY_API_BASE_URL}/api/v1/campaigns?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        Accept: "application/json",
      },
      next: { revalidate: ZEFFY_CAMPAIGNS_REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    console.error(
      `Zeffy campaigns request failed: ${response.status} ${response.statusText}`,
    );
    return null;
  }

  return (await response.json()) as ZeffyCampaignList;
}

export async function listAllZeffyCampaigns(): Promise<ZeffyCampaign[]> {
  const campaigns: ZeffyCampaign[] = [];
  let startingAfter: string | undefined;

  while (true) {
    const page = await listZeffyCampaignsPage({ startingAfter });

    if (!page?.data?.length) {
      break;
    }

    campaigns.push(...page.data);

    if (!page.has_more || !page.next_cursor) {
      break;
    }

    startingAfter = page.next_cursor;
  }

  return campaigns;
}
