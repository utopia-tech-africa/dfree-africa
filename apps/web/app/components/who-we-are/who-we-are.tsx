import ComponentLayout from "@/components/component-layout";
import React from "react";
import { MissionVisionSection } from "./mission-vision-section";
import { ImagesSection } from "./images-section";

const WhoWeAre = () => {
  return (
    <ComponentLayout
      id="our-story"
      className="mb-8 scroll-mt-24 md:mb-12 md:scroll-mt-28 lg:mb-20"
    >
      <MissionVisionSection />
      <ImagesSection />
    </ComponentLayout>
  );
};

export default WhoWeAre;
