"use client";

import React from "react";
import { Banner } from "./banner";

export const AfricaBanner = ({ classname }: { classname?: string }) => {
  return (
    <Banner
      className={classname}
      backgroundImage={
        "https://res.cloudinary.com/dan9camhs/image/upload/v1773146939/afa2bc68-190b-4408-a424-8e57d7718d67.webp"
      }
      title="Let’s create financial empowerment"
      description="By investing in education, clean water for a village, or skills training for the youth, you make a significant contribution to empowering whole generations to be independent and to have better quality of life."
      href="#"
      label="Learn how you can support"
    />
  );
};
