"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ComponentLayout from "@/components/component-layout";
import { ContentCard } from "@/components/content-card/content-card";
import { Button } from "@/components/ui/button";
import { eventsData } from "@/lib/events";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const SCROLL_EDGE_THRESHOLD = 10;

export const Events = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalSlides = eventsData.events.length;

  const updateScrollArrows = useCallback(() => {
    const container = scrollContainerRef.current;
    const cards = cardRefsRef.current;
    if (!container || !cards.length) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    // Update arrow states
    setCanScrollLeft(scrollLeft > SCROLL_EDGE_THRESHOLD);
    setCanScrollRight(
      scrollLeft < scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD,
    );

    // If scrolled to the very end, force last index
    if (scrollLeft >= scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD) {
      setActiveIndex(cards.length - 1);
      return;
    }

    // Otherwise calculate normally
    const containerPaddingLeft =
      parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const cardWidth = cards[0]?.offsetWidth || 1;
    const gap = 24; // Tailwind gap-6

    const rawIndex = (scrollLeft + containerPaddingLeft) / (cardWidth + gap);
    const index = Math.round(rawIndex);

    setActiveIndex(Math.min(index, cards.length - 1));
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    const cards = cardRefsRef.current;
    if (!container || !cards[index]) return;

    const cardWidth = cards[0]?.offsetWidth || 1;
    const gap = 20;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const targetScroll = Math.min(index * (cardWidth + gap), maxScroll);

    container.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });

    setActiveIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    if (!canScrollLeft) return;
    if (activeIndex <= 0) return;
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, canScrollLeft, scrollToIndex]);

  const goNext = useCallback(() => {
    if (!canScrollRight) return;
    if (activeIndex >= totalSlides - 1) return;
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, canScrollRight, totalSlides, scrollToIndex]);

  useEffect(() => {
    updateScrollArrows();
    const el = scrollContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollArrows);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateScrollArrows]);

  const canGoPrev = canScrollLeft;
  const canGoNext = canScrollRight;

  return (
    <ComponentLayout className="overflow-hidden mb-20 md:mb-24 lg:mb-40">
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
          <Link href={""} className="w-fit">
            <Button
              variant="default"
              size="default"
              className="h-auto gap-3 px-3 py-3 text-sm leading-[1.3] font-medium md:px-8 md:text-lg"
              icon={
                <ArrowRight
                  className="size-4.5 shrink-0 md:size-5"
                  strokeWidth={2}
                />
              }
            >
              View all events
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative mt-10">
        <div className="-mx-4 md:-mx-10 lg:-mx-20 overflow-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollArrows}
            className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 md:px-10 lg:px-20 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ msOverflowStyle: "none" }}
          >
            {eventsData.events.map((event, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefsRef.current[index] = el;
                }}
                className="min-w-[320px] md:min-w-90 lg:min-w-101.25 w-[320px] md:w-90 lg:w-101.25 shrink-0 flex"
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

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-6 md:gap-0">
          <div className="flex md:flex-none justify-center items-center gap-2">
            {eventsData.events.map((_, index) => (
              <span
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "bg-neutral-900 scale-120"
                    : "bg-neutral-300 hover:bg-neutral-400",
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-disabled={!canGoPrev}
              className="p-2 text-neutral-1000 cursor-pointer transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 hover:bg-neutral-100"
              aria-label="Previous slide"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              aria-disabled={!canGoNext}
              className="p-2 text-neutral-1000 cursor-pointer transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 hover:bg-neutral-100"
              aria-label="Next slide"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="mt-4 md:hidden flex justify-center">
          <Link href={""} className="w-fit">
            <Button
              variant="default"
              size="default"
              className="h-auto gap-3 px-3 py-3 text-sm leading-[1.3] font-medium md:px-8 md:text-lg"
              icon={
                <ArrowRight
                  className="size-4.5 shrink-0 md:size-5"
                  strokeWidth={2}
                />
              }
            >
              View all events
            </Button>
          </Link>
        </div>
      </div>
    </ComponentLayout>
  );
};
