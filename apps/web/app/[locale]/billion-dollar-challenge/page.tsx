import { createMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Testimonials from "../../components/testimonials/testimonials";
import {
  BDCHero,
  AboutBdc,
  BDCImpact,
  HowItWorks,
  Partners,
  Audience,
  BDCBanner,
} from "./components";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("billionDollarChallenge.title"),
    description: t("billionDollarChallenge.description"),
    path: `/${locale}/billion-dollar-challenge`,
  });
}

export default function BDCPage() {
  return (
    <div>
      <BDCHero />
      <AboutBdc />
      <BDCImpact />
      <HowItWorks />
      <Audience />
      <Partners />
      <Testimonials />
      <BDCBanner />
    </div>
  );
}
