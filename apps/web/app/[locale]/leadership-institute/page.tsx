import { createMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import {
  DevelopLeaders,
  DfreeFellow,
  HowItWorks,
  InstituteInfo,
  LeadershipInstituteAbout,
  LeadershipInstituteHero,
  SupportTheInstitute,
} from "./components";
import CoreAreas from "./components/core-areas/core-areas";
import LeadershipInstitureBanner from "./components/banner/leadership-institute-banner";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("leadershipInstitute.title"),
    description: t("leadershipInstitute.description"),
    path: `/${locale}/leadership-institute`,
  });
}

export default function LeadershipInstitutePage() {
  return (
    <div className="space-y-20 sm:space-y-30">
      <LeadershipInstituteHero />
      <LeadershipInstituteAbout />
      <InstituteInfo />
      <DfreeFellow />
      <CoreAreas />
      <DevelopLeaders />
      <HowItWorks />
      <SupportTheInstitute />
      <LeadershipInstitureBanner />
    </div>
  );
}
