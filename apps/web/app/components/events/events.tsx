"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ComponentLayout from "@/components/component-layout";
import { ContentCard } from "@/components/content-card/content-card";
import { Button } from "@/components/ui/button";
import { eventsData } from "@/lib/events";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SCROLL_EDGE_THRESHOLD = 10;

export const Events = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalSlides = eventsData.events.length;

  const updateScrollArrows = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > SCROLL_EDGE_THRESHOLD);
    setCanScrollRight(
      scrollLeft < scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD,
    );

    if (scrollLeft < SCROLL_EDGE_THRESHOLD) {
      setActiveIndex(0);
      return;
    }
    const cards = cardRefsRef.current;
    const viewportCenter = scrollLeft + clientWidth / 2;
    let newIndex = 0;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      if (card) {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        if (viewportCenter >= cardCenter) newIndex = i;
      }
    }
    setActiveIndex(newIndex);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    const card = cardRefsRef.current[index];
    if (!container || !card) {
      setActiveIndex(index);
      return;
    }
    const paddingLeft =
      parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const targetScroll = Math.max(0, card.offsetLeft - paddingLeft);
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({
      left: Math.min(targetScroll, maxScroll),
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

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            {eventsData.events.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "bg-neutral-900 scale-110"
                    : "bg-neutral-300 hover:bg-neutral-400",
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={!canGoPrev}
              aria-disabled={!canGoPrev}
              className="p-2 text-neutral-1000 cursor-pointer transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 hover:bg-neutral-100"
              aria-label="Previous slide"
            >
              <ArrowLeft size={25} />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              aria-disabled={!canGoNext}
              className="p-2 text-neutral-1000 cursor-pointer transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 hover:bg-neutral-100"
              aria-label="Next slide"
            >
              <ArrowRight size={25} />
            </button>
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};
