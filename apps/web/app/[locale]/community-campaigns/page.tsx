import { createMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { CampaignsWhatWeDo } from "./components";
import { CampaignsAbout } from "./components/campaigns-about";
import { CampaignsCta } from "./components/campaigns-cta";
import { CampaignsFeatured } from "./components/campaigns-featured";
import { CampaignsHero } from "./components/campaigns-hero";
import { CampaignsImpact } from "./components/campaigns-impact";
import { CampaignsResults } from "./components/campaigns-results";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("communityCampaigns.title"),
    description: t("communityCampaigns.description"),
    path: `/${locale}/community-campaigns`,
  });
}

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
