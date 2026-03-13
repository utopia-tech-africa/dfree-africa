import { createMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import {
  ASCAbout,
  ASCAccessibilty,
  ASCHero,
  AscHowItWorks,
  ASCWhatsCovered,
  ASCWhyScholarshipsMatterSection,
  ASCPartnerWithUs,
  AscBanner,
} from "./components";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("accessScholarships.title"),
    description: t("accessScholarships.description"),
    path: `/${locale}/access-scholarships`,
  });
}

export default function AccessSholarships() {
  return (
    <div className="space-y-20 sm:space-y-30">
      <ASCHero />
      <ASCAbout />
      <ASCWhyScholarshipsMatterSection />
      <ASCWhatsCovered />
      <ASCAccessibilty />
      <AscHowItWorks />
      <ASCPartnerWithUs />
      <AscBanner />
    </div>
  );
}
