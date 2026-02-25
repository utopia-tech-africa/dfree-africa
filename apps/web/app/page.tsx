import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import React from "react";
import Testimonials from "./components/testimonials/testimonials";
import WhoWeAre from "./components/who-we-are/who-we-are";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description:
    "DFREE Africa - Empowering communities with financial freedom and sustainable development across the African continent.",
  path: "/",
});

const Home = () => {
  return (
    <>
      <div className="grid h-screen place-items-center">
        <WhoWeAre />
        {/* <Testimonials /> */}
      </div>
    </>
  );
};

export default Home;
