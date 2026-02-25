import ComponentLayout from "@/components/component-layout";
import React from "react";
import { MissionVisionSection } from "./mission-vision-section";
import { ImagesSection } from "./images-section";

const WhoWeAre = () => {
  return (
    <ComponentLayout>
      <MissionVisionSection />
      <ImagesSection />
    </ComponentLayout>
  );
};

export default WhoWeAre;
