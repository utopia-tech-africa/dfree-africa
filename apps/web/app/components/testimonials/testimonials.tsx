"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { QuotationMarks } from "@/assets";
import ComponentLayout from "@/components/component-layout";
import { TESTIMONIALS } from "@/lib/testimonials";
import TestimonialCard from "./testimonial-card";
import { Title } from "@/components/title-and-subtitle/title";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Testimonials = () => {
  const t = useTranslations("home.testimonials");
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

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.firstElementChild?.clientWidth || 1;
    const gap = 16;

    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const goPrev = () => {
    if (activeIndex <= 0) return;
    scrollToIndex(activeIndex - 1);
  };

  const goNext = () => {
    if (activeIndex >= TESTIMONIALS.length - 1) return;
    scrollToIndex(activeIndex + 1);
  };

  return (
    <section className="relative overflow-hidden bg-neutral-100 py-24 md:py-40 mb-10 lg:mb-16">
      <ComponentLayout className="relative">
        <QuotationMarks className="absolute -top-10 left-0 w-20 h-20 sm:-top-16 md:-top-40 md:w-47.5 md:h-47.5 pointer-events-none z-10" />

        <QuotationMarks className="absolute -bottom-10 right-0 w-20 h-20 md:-bottom-40 md:w-47.5 md:h-47.5 rotate-180 pointer-events-none z-10" />

        <div className="relative z-10 max-w-3xl mx-auto mb-10 md:mb-6 text-center flex flex-col gap-3 px-4 sm:px-0">
          <Title className="font-montserrat" text={t("title")} />

          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[38px] font-extrabold text-secondary-600 leading-tight font-montserrat">
            {t("heading")}
          </h2>

          <p className="font-normal leading-[120%] font-poppins text-neutral-1000 text-base sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative z-10 -mx-4 md:-mx-10 lg:-mx-20 overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-4 md:px-10 lg:px-20 scrollbar-hide"
          >
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* controls */}
          <div className="flex items-center justify-between mt-6 px-4 md:px-10 lg:px-20 relative">
            {/* Arrows LEFT */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={activeIndex === 0}
                className="p-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
              >
                <FaArrowLeft className="hidden lg:block size-6 text-neutral-900" />
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={activeIndex === TESTIMONIALS.length - 1}
                className="p-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
              >
                <FaArrowRight className="hidden lg:block size-6 text-neutral-900" />
              </button>
            </div>

            {/* Indicators CENTER */}
            <div className="absolute left-1/2 -translate-x-1/2 flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-neutral-1000 scale-110"
                      : "bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};

export default Testimonials;
