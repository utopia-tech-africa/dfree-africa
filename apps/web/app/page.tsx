import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import React from "react";
import Testimonials from "./components/testimonials/testimonials";
import WhoWeAre from "./components/who-we-are/who-we-are";
import Pillars from "./components/pillars/pillars";
import { HomeHero } from "./components/home-hero";
import { Events } from "./components/events";
import { Blogs } from "./components/blogs";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description:
    "DFREE Africa - Empowering communities with financial freedom and sustainable development across the African continent.",
  path: "/",
});

const Home = () => {
  return (
    <>
      <div className="grid min-h-screen">
        <HomeHero />
        <WhoWeAre />
        <Pillars />
        {/* <WhoWeAre /> */}
        <Testimonials />
        <Events />
        <Blogs />
      </div>
    </>
  );
};

export default Home;
