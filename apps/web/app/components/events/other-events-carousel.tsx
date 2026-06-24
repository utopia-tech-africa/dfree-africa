"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ComponentLayout from "@/components/component-layout";
import { cn } from "@/lib/utils";
import { EventCard, type EventCardProps } from "./event-card";

const SCROLL_EDGE_THRESHOLD = 10;

interface OtherEventsCarouselProps {
  events: EventCardProps[];
}

export const OtherEventsCarousel = ({ events }: OtherEventsCarouselProps) => {
  const t = useTranslations("home.events.detail");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalSlides = events.length;

  const updateScrollArrows = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > SCROLL_EDGE_THRESHOLD);
    setCanScrollRight(
      scrollLeft < scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD,
    );

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

    if (!container || !card) return;

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

  const goPrev = () => scrollToIndex(Math.max(activeIndex - 1, 0));
  const goNext = () =>
    scrollToIndex(Math.min(activeIndex + 1, totalSlides - 1));

  useEffect(() => {
    updateScrollArrows();
    const el = scrollContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollArrows);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateScrollArrows, events]);

  return (
    <ComponentLayout className="overflow-hidden mb-20">
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">{t("otherEventsTitle")}</h2>

        <div className="relative">
          <div className="-mx-4 md:-mx-10 lg:-mx-20 overflow-hidden">
            <div
              ref={scrollContainerRef}
              onScroll={updateScrollArrows}
              className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 md:px-10 lg:px-20 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ msOverflowStyle: "none" }}
            >
              {events.map((eventItem, idx) => (
                <div
                  key={`${eventItem.link}-${idx}`}
                  ref={(el) => {
                    cardRefsRef.current[idx] = el;
                  }}
                  className="min-w-[320px] md:min-w-[360px] lg:min-w-[405px] w-[320px] md:w-[360px] lg:w-[405px] shrink-0 flex"
                >
                  <EventCard {...eventItem} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {events.map((_, index) => (
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
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={!canScrollLeft}
                className="p-2 transition disabled:pointer-events-none disabled:opacity-40 hover:bg-neutral-100"
                aria-label="Previous slide"
              >
                <FaArrowLeft className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={!canScrollRight}
                className="p-2 transition disabled:pointer-events-none disabled:opacity-40 hover:bg-neutral-100"
                aria-label="Next slide"
              >
                <FaArrowRight className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};
