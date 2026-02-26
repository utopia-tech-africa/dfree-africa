import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import React from "react";
import Testimonials from "./components/testimonials/testimonials";
import WhoWeAre from "./components/who-we-are/who-we-are";
import Merch from "./components/merch/merch";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description:
    "DFREE Africa - Empowering communities with financial freedom and sustainable development across the African continent.",
  path: "/",
});

const Home = () => {
  return (
    <div className="flex flex-col gap-16 sm:gap-24 w-full">
      <WhoWeAre />
      {/* <Testimonials /> */}
      <Merch />
    </div>
  );
};

export default Home;
