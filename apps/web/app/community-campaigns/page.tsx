import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { CampaignsWhatWeDo } from "./components";
import { CampaignsAbout } from "./components/campaigns-about";
import { CampaignsCta } from "./components/campaigns-cta";
import { CampaignsFeatured } from "./components/campaigns-featured";
import { CampaignsHero } from "./components/campaigns-hero";
import { CampaignsImpact } from "./components/campaigns-impact";
import { CampaignsResults } from "./components/campaigns-results";

export const metadata: Metadata = createMetadata({
  title: "Community Campaigns",
  description:
    "Dynamic community-wide campaigns that unite churches, civic groups, and local organizations to implement synchronized DFREE® financial empowerment programs.",
  path: "/community-campaigns",
});

const CommunityCampaignsPage = () => {
  return (
    <div className="grid min-h-dvh gap-20">
      <CampaignsHero />
      <CampaignsAbout />
      <CampaignsImpact />
      <CampaignsWhatWeDo />
      <CampaignsFeatured />
      <CampaignsResults />
      <CampaignsCta />
    </div>
  );
};

export default CommunityCampaignsPage;
