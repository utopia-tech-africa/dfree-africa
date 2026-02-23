import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import React from "react";
import { ContinentalImpact, FeaturedProjects, Hero } from "./components";
import { OurStory } from "./components/our-story";

export const metadata: Metadata = createMetadata({
  title: "Africa",
  description:
    "Empowering Africa - Driving financial freedom and sustainable community development through education, skills training, and economic programs.",
  path: "/africa",
});

const AfricaPage = () => {
  return (
    <div>
      <Hero />
      <OurStory />
      <ContinentalImpact />
      <FeaturedProjects />
    </div>
  );
};

export default AfricaPage;
