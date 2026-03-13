"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import ComponentLayout from "@/components/component-layout";
import { ContentCard } from "@/components/content-card/content-card";
import { Button } from "@/components/ui/button";
import { EVENT_KEYS, EVENTS_META } from "@/lib/events";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const SCROLL_EDGE_THRESHOLD = 10;

interface EventListProps {
  showHeader?: boolean;
  layout?: "scroll" | "grid";
}

export const Events = ({
  showHeader = true,
  layout = "scroll",
}: EventListProps) => {
  const t = useTranslations("home.events");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalSlides = EVENTS_META.length;

  // Only relevant for horizontal scrolling
  const updateScrollArrows = useCallback(() => {
    if (layout !== "scroll") return;

    const container = scrollContainerRef.current;
    const cards = cardRefsRef.current;
    if (!container || !cards.length) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > SCROLL_EDGE_THRESHOLD);
    setCanScrollRight(
      scrollLeft < scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD,
    );

    if (scrollLeft >= scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD) {
      setActiveIndex(cards.length - 1);
      return;
    }

    const containerPaddingLeft =
      parseFloat(getComputedStyle(container).paddingLeft) || 0;
    const cardWidth = cards[0]?.offsetWidth || 1;
    const gap = 24;
    const rawIndex = (scrollLeft + containerPaddingLeft) / (cardWidth + gap);
    const index = Math.round(rawIndex);

    setActiveIndex(Math.min(index, cards.length - 1));
  }, [layout]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (layout !== "scroll") return;

      const container = scrollContainerRef.current;
      const cards = cardRefsRef.current;
      if (!container || !cards[index]) return;

      const cardWidth = cards[0]?.offsetWidth || 1;
      const gap = 24;

      const maxScroll = container.scrollWidth - container.clientWidth;
      const targetScroll = Math.min(index * (cardWidth + gap), maxScroll);

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });

      setActiveIndex(index);
    },
    [layout],
  );

  const goPrev = useCallback(() => {
    if (!canScrollLeft || activeIndex <= 0) return;
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, canScrollLeft, scrollToIndex]);

  const goNext = useCallback(() => {
    if (!canScrollRight || activeIndex >= totalSlides - 1) return;
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, canScrollRight, totalSlides, scrollToIndex]);

  useEffect(() => {
    if (layout !== "scroll") return;

    updateScrollArrows();
    const el = scrollContainerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(updateScrollArrows);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateScrollArrows, layout]);

  const canGoPrev = canScrollLeft;
  const canGoNext = canScrollRight;

  return (
    <ComponentLayout className="overflow-hidden mb-20 md:mb-24 lg:mb-40">
      {/* Header */}
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          <div className="flex flex-col gap-3 max-w-2xl">
            <p className="text-tertiary-500 font-bold text-base leading-[150%]">
              {t("label")}
            </p>
            <h2 className="text-neutral-1000 text-[28px] md:text-[36px] lg:text-[48px] font-bold leading-[120%]">
              {t("title")}
            </h2>
            <p className="text-neutral-900 leading-[150%] font-normal">
              {t("subtitle")}
            </p>
          </div>

          <Link href={"/events"} className="w-fit">
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
              {t("viewAllCta")}
            </Button>
          </Link>
        </div>
      )}

      {/* Content */}
      {layout === "scroll" ? (
        <div className="-mx-4 md:-mx-10 lg:-mx-20 overflow-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={updateScrollArrows}
            className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 md:px-10 lg:px-20 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ msOverflowStyle: "none" }}
          >
            {EVENT_KEYS.map((key, index) => {
              const meta = EVENTS_META.find((e) => e.id === key);
              if (!meta) return null;
              const baseKey = `items.${key}`;

              return (
                <div
                  key={key}
                  ref={(el) => {
                    cardRefsRef.current[index] = el;
                  }}
                  className="min-w-[320px] md:min-w-90 lg:min-w-101.25 w-[320px] md:w-90 lg:w-101.25 shrink-0 flex"
                >
                  <ContentCard
                    image={meta.image}
                    badge={t(`${baseKey}.badge`)}
                    title={t(`${baseKey}.title`)}
                    description={t(`${baseKey}.description`)}
                    location={t(`${baseKey}.location`)}
                    link={meta.link}
                    date={{
                      day: t(`${baseKey}.date.day`),
                      dated: t(`${baseKey}.date.dated`),
                      mode: t(`${baseKey}.date.mode`),
                      year: t(`${baseKey}.date.year`),
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Scroll dots & arrows */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-6 md:gap-0 px-4 md:px-10 lg:px-20">
            <div className="flex md:flex-none justify-center items-center gap-2">
              {EVENT_KEYS.map((_, index) => (
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
                <FaArrowLeft className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={!canGoNext}
                aria-disabled={!canGoNext}
                className="p-2 text-neutral-1000 cursor-pointer transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 hover:bg-neutral-100"
                aria-label="Next slide"
              >
                <FaArrowRight className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
              </button>
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
                  {t("viewAllCta")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        // GRID layout
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {EVENT_KEYS.map((key) => {
            const meta = EVENTS_META.find((e) => e.id === key);
            if (!meta) return null;
            const baseKey = `items.${key}`;

            return (
              <ContentCard
                key={key}
                image={meta.image}
                badge={t(`${baseKey}.badge`)}
                title={t(`${baseKey}.title`)}
                description={t(`${baseKey}.description`)}
                location={t(`${baseKey}.location`)}
                link={meta.link}
                date={{
                  day: t(`${baseKey}.date.day`),
                  dated: t(`${baseKey}.date.dated`),
                  mode: t(`${baseKey}.date.mode`),
                  year: t(`${baseKey}.date.year`),
                }}
              />
            );
          })}
        </div>
      )}
    </ComponentLayout>
  );
};
