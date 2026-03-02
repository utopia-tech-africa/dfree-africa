import { CampaignsWhatWeDo } from "./components";
import { CampaignsFeatured } from "./components/campaigns-featured";
import { CampaignsHero } from "./components/campaigns-hero";
import { CampaignsResults } from "./components/campaigns-results";

const CommunityCampaignsPage = () => {
  return (
    <div className="grid min-h-dvh">
      <CampaignsHero />
      <CampaignsWhatWeDo />
      <CampaignsFeatured />
      <CampaignsResults />
    </div>
  );
};

export default CommunityCampaignsPage;
