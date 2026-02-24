import { createMetadata } from "@/lib/seo";
import { getFeaturedProjects } from "@/lib/sanity";
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

const AfricaPage = async () => {
  const featuredProjects = await getFeaturedProjects();
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
    </div>
  );
};

export default AfricaPage;
