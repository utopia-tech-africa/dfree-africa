import React from "react";
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

export const FinFestTestimonials = () => {
  return (
    <section className="py-4 bg-white overflow-hidden">
      <ComponentLayout className="space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center  max-w-[800px] mx-auto">
          <Title text="Testimonials" />
          <Subtitle text="What Our Clients Are Saying" />
          <p className="text-base md:text-lg text-neutral-900 font-poppins opacity-80">
            Don't just take our word for it; here's what past attendees said
            about FinFe$t.
          </p>
        </div>

        {/* Carousel Slider with right bleed */}
        <Carousel
          options={{
            align: "start",
            containScroll: "trimSnaps",
            slidesToScroll: 1,
            breakpoints: {
              "(min-width: 768px)": { slidesToScroll: 2 },
              "(min-width: 1024px)": { slidesToScroll: 3 },
            },
          }}
          viewportClassName="-mr-4 md:-mr-10 lg:-mr-20 xl:-mr-[50vw] overflow-hidden max-w-[1430px]"
          slideClassName="basis-[300px]"
        >
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} testimonial={item} />
          ))}
        </Carousel>
      </ComponentLayout>
    </section>
  );
};
