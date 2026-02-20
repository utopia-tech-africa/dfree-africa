"use client";

import React from "react";
import { Banner } from "./banner";
import { AfricaBannerBg } from "@/assets";

export const AfricaBanner = ({ classname }: { classname?: string }) => {
  return (
    <Banner
      className={classname}
      backgroundImage={AfricaBannerBg}
      title="Let’s create financial empowerment"
      description="By investing in education, clean water for a village, or skills training for the youth, you make a significant contribution to empowering whole generations to be independent and to have better quality of life."
      href="#"
      label="Learn how you can support"
    />
  );
};
