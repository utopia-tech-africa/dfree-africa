import { createMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import React from "react";
import Testimonials from "../components/testimonials/testimonials";
import WhoWeAre from "../components/who-we-are/who-we-are";
import Pillars from "../components/pillars/pillars";
import { HomeHero } from "../components/home-hero";
import { OurImpact } from "../components/our-impact";
import { Events } from "../components/events";
import Merch from "../components/merch/merch";
import { BlogList } from "../components/blogs";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("home.title"),
    description: t("home.description"),
    path: `/${locale}`,
  });
}

const Home = () => {
  return (
    <>
      <div className="grid min-h-dvh">
        <HomeHero />
        <WhoWeAre />
        <Pillars />
        <OurImpact />
        <Testimonials />
        <Events />
        <Merch />
        <BlogList compact />
      </div>
    </>
  );
};

export default Home;
