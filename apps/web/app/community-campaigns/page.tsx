import { CampaignsWhatWeDo } from "./components";
import { CampaignsAbout } from "./components/campaigns-about";
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
    </div>
  );
};

export default CommunityCampaignsPage;
