import ComponentLayout from "@/components/component-layout";
import React from "react";
import { MissionVisionSection } from "./mission-vision-section";
import { ImagesSection } from "./images-section";

const WhoWeAre = () => {
  return (
    <ComponentLayout className="mb-8 md:mb-12 lg:mb-20">
      <MissionVisionSection />
      <ImagesSection />
    </ComponentLayout>
  );
};

export default WhoWeAre;
