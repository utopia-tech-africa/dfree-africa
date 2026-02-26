import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import React from "react";
import { HomeHero } from "./components/home-hero";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description:
    "DFREE Africa - Empowering communities with financial freedom and sustainable development across the African continent.",
  path: "/",
});

const Home = () => {
  return (
    <>
      <div>
        <HomeHero />
      </div>
    </>
  );
};

export default Home;
