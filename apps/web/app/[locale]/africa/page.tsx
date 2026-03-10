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

  return (
    <div>
      <Hero />
      <OurStory />
      <ContinentalImpact />
      <FeaturedProjects
        projects={featuredProjects}
        title="Projects"
        subtitle="Featured projects"
        description="With the support of committed partners and in collaboration with community leaders and local governments, our projects and initiatives continue to have direct, life-changing impact on communities, transforming lives across the continent."
        href="/africa/projects"
      />
      {photoGallery && photoGallery.years.length > 0 && (
        <PhotoGallery
          className="mt-[155px]"
          label={photoGallery.label}
          title={photoGallery.title}
          subtitle={photoGallery.subtitle}
          years={photoGallery.years}
        />
      )}
    </div>
  );
};

export default AfricaPage;
