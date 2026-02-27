"use client";

import { useEffect, useRef, useState } from "react";
import { QuotationMarks } from "@/assets";
import ComponentLayout from "@/components/component-layout";
import { testimonials } from "@/lib/testimonials";
import TestimonialCard from "./testimonial-card";
import { Title } from "@/components/title-and-subtitle/title";

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.firstElementChild?.clientWidth || 1;
      const gap = 16; // gap-4
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-neutral-100 py-24 md:py-20 lg:py-40 mb-10 lg:mb-16">
      <ComponentLayout>
        <div className="relative z-10 max-w-3xl mx-auto mb-10 md:mb-6 text-center flex flex-col gap-3 px-4 sm:px-0">
          <Title className="font-montserrat" text="Testimonials" />

          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[38px] font-extrabold text-secondary-600 leading-tight font-montserrat">
            Real stories of change
          </h2>

          <p className="font-normal leading-[120%] font-poppins text-neutral-1000 text-base sm:text-lg">
            Voices that reveal the power of financial transformation
          </p>
        </div>

        <div className="relative z-10">
          <QuotationMarks className="absolute -top-57 -left-5 w-24 h-24 md:-top-42 md:-left-20 md:w-47.5 md:h-47.5 pointer-events-none z-10" />

          <QuotationMarks className="absolute -bottom-10 -right-6 w-24 h-24 md:-bottom-40 md:-right-20 md:w-47.5 md:h-47.5 rotate-180 pointer-events-none z-10" />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto md:overflow-visible scrollbar-hide px-4 md:px-0"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-2 md:hidden">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-neutral-1000" : "bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};

export default Testimonials;
