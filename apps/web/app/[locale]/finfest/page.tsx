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

export default async function FinFestPage() {
  const gallery = await getFinfestGallery();
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
          label="Photo Gallery"
          title={gallery.title}
          subtitle="Our favourite memories  from past  events"
        />
      )}
      <FinfestBanner />
    </div>
  );
}
