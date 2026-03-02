import { CampaignsWhatWeDo } from "./components";
import CampaignsFeatured from "./components/campaigns-featured/campaigns-featured";
import { CampaignsHero } from "./components/campaigns-hero";

const CommunityCampaignsPage = () => {
  return (
    <div>
      <CampaignsHero />
      <CampaignsWhatWeDo />
      <CampaignsFeatured />
    </div>
  );
};

export default CommunityCampaignsPage;
