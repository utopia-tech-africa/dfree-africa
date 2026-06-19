import { donateCauses } from "@/app/[locale]/donate/data/causes";
import type { DonateCause } from "@/app/[locale]/donate/data/causes";
import { listAllZeffyCampaigns } from "./client";
import { mapZeffyCampaignsToDonateCauses } from "./map-campaign";

export async function getDonationCampaigns(): Promise<DonateCause[]> {
  const campaigns = await listAllZeffyCampaigns();

  if (!campaigns.length) {
    return donateCauses;
  }

  const mapped = mapZeffyCampaignsToDonateCauses(campaigns);

  return mapped.length > 0 ? mapped : donateCauses;
}
