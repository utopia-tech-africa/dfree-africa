import { createMetadata } from "@/lib/seo";
import { getFinfestGallery } from "@/lib/sanity";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import {
  FinfestBanner,
  FinfestPastSpeakers,
  FinfestTestimonials,
  FinfestGallerySection,
  FinfestSponsors,
} from "./components";
import { FinfestHero } from "./components/finfest-hero";
import { FinfestObjective } from "./components/finfest-objective";
import FinfestMovement from "./components/finfest-objective/finfest-movement";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("finfest.title"),
    description: t("finfest.description"),
    path: `/${locale}/finfest`,
  });
}

export default async function FinFestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const gallery = await getFinfestGallery();
  const t = await getTranslations("finfest.gallery");
  return (
    <div className="space-y-20 sm:space-y-30">
      <FinfestHero />
      <FinfestObjective />
      <FinfestMovement />
      <FinfestPastSpeakers />
      <FinfestSponsors />
      <FinfestTestimonials />
      {gallery && gallery.years.length > 0 && (
        <FinfestGallerySection
          gallery={gallery}
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
      )}
      <FinfestBanner />
    </div>
  );
}
