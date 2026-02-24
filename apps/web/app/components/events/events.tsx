"use client";

import ComponentLayout from "@/components/component-layout";
import { ContentCard } from "@/components/content-card/content-card";
import { Button } from "@/components/ui/button";
import { eventsData } from "@/lib/events";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export const Events = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

      // Calc active index based on scroll position
      const cardWidth = 320; // min width
      const gap = 24; // gap-6 = 1.5rem = 24px
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(newIndex, eventsData.events.length - 1));
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 320;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <ComponentLayout className="py-16 overflow-hidden">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <p className="text-tertiary-500 font-bold text-base leading-[150%]">
              {eventsData.label}
            </p>
            <h2 className="text-neutral-1000 text-[28px] md:text-[36px] lg:text-[48px] font-bold leading-[120%]">
              {eventsData.title}
            </h2>
            <p className="text-neutral-900 leading-[150%] font-normal">
              {eventsData.subtitle}
            </p>
          </div>

          <Button className="flex text-lg items-center gap-2 px-6 py-3 shrink-0">
            View all events
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      <div className="relative mt-10">
        <div className="-mx-4 md:-mx-10 lg:-mx-20">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto px-4 md:px-10 lg:px-20 pb-6 scrollbar-hide scroll-smooth"
          >
            {eventsData.events.map((event, index) => (
              <div
                key={index}
                className="min-w-[320px]  md:min-w-90 lg:min-w-101.25 w-[320px] md:w-90 lg:w-101.25 flex"
              >
                <ContentCard
                  image={event.image}
                  badge={event.event}
                  title={event.eventTitle}
                  description={event.description}
                  location={event.location}
                  link={event.link}
                  date={event.date}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {eventsData.events.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = 320;
                    const gap = 24;
                    scrollContainerRef.current.scrollTo({
                      left: index * (cardWidth + gap),
                      behavior: "smooth",
                    });
                  }
                }}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "bg-neutral-900 scale-110"
                    : "bg-neutral-300 hover:bg-neutral-400",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!showLeftArrow}
              className="p-2 text-neutral-1000 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition"
              aria-label="Scroll left"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={!showRightArrow}
              className="p-2 text-neutral-1000 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition"
              aria-label="Scroll right"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};
