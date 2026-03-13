import React from "react";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Testimonial, TestimonialCard } from "./components/testimonial-card";

const testimonials: Testimonial[] = [
  {
    type: "video",
    name: "Reginal",
    thumbnail: "/videos/finfest/reginald-testimonial.mp4",
  },
  {
    type: "text",
    name: "Zakiyya Jordan",
    organization: "Zeta Ph Beta Sorority, Inc.",
    content:
      '"DFREE® has definitely given me confidence in how to manage my finances and great insight into unhealthy spending behaviors and attitudes."',
  },
  {
    type: "video",
    name: "Tamara",
    thumbnail: "/videos/finfest/tamara-testimonial.mp4",
  },
  {
    type: "text",
    name: "Diana Belle",
    organization: "Clear View Baptist Church",
    content:
      '"I am a better steward of my finances having gone through this process. I am now working on leaving a legacy for my daughters."',
  },
  {
    type: "video",
    name: "Ruth",
    thumbnail: "/videos/finfest/ruth-testimonial.mp4",
  },
  {
    type: "text",
    name: "Jackie Jackson",
    organization: "Community Partner",
    content:
      '"This DFREE® course helped me organize my finances, find the leaks and paid off my credit card debt, none of which I could have done on my own!"',
  },
];

import { Carousel } from "@/components/carousel";

export const FinfestTestimonials = async () => {
  const t = await getTranslations("finfest.testimonials");
  return (
    <section className="bg-white overflow-hidden">
      <ComponentLayout className="space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center  max-w-[800px] mx-auto">
          <Title text={t("title")} />
          <Subtitle text={t("subtitle")} />
          <p className="text-base md:text-lg text-neutral-900 font-poppins opacity-80">
            {t("description")}
          </p>
        </div>

        {/* Carousel Slider with right bleed */}
        <Carousel slideClassName="w-[300px]">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} testimonial={item} />
          ))}
        </Carousel>
      </ComponentLayout>
    </section>
  );
};
