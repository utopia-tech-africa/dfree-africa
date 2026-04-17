import React from "react";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Testimonial, TestimonialCard } from "./components/testimonial-card";
import { Carousel } from "@/components/carousel";

export const FinfestTestimonials = async () => {
  const t = await getTranslations("finfest.testimonials");
  const testimonials = t.raw("items") as Testimonial[];

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
