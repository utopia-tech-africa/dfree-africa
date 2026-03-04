import { CampaignsWhatWeDo } from "./components";
import { CampaignsAbout } from "./components/campaigns-about";
import { CampaignsCta } from "./components/campaigns-cta";
import { CampaignsFeatured } from "./components/campaigns-featured";
import { CampaignsHero } from "./components/campaigns-hero";
import { CampaignsImpact } from "./components/campaigns-impact";
import { CampaignsResults } from "./components/campaigns-results";

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
