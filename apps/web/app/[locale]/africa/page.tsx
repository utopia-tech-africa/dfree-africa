import { createMetadata } from "@/lib/seo";
import { getFeaturedProjects, getPhotoGallery } from "@/lib/sanity";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import React from "react";
import { ContinentalImpact, FeaturedProjects, Hero } from "./components";
import { OurStory } from "./components/our-story";
import { PhotoGallery } from "./continental/components";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("africa.title"),
    description: t("africa.description"),
    path: `/${locale}/africa`,
  });
}

const AfricaPage = async () => {
  const [featuredProjects, photoGallery] = await Promise.all([
    getFeaturedProjects(),
    getPhotoGallery(),
  ]);
  const t = await getTranslations("africa.featuredProjects");
  const galleryT = await getTranslations("africa.photoGallery");

  return (
    <div>
      <Hero />
      <OurStory />
      <ContinentalImpact />
      <FeaturedProjects
        projects={featuredProjects}
        title={t("title")}
        subtitle={t("subtitle")}
        description={t("description")}
        href={t("href")}
      />
      {photoGallery && photoGallery.years.length > 0 && (
        <PhotoGallery
          className="mt-[155px]"
          label={galleryT("label")}
          title={galleryT("title")}
          subtitle={galleryT("subtitle")}
          years={photoGallery.years}
        />
      )}
    </div>
  );
};

export default AfricaPage;
