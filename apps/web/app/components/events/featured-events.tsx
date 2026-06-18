"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { EventForUI } from "@/lib/sanity";
import { EventCard } from "./event-card";
import ComponentLayout from "@/components/component-layout";
import { cn } from "@/lib/utils";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";

const SCROLL_EDGE_THRESHOLD = 10;

interface FeaturedEventsProps {
  className?: string;
  showHeader?: boolean;
  featured?: boolean;
  allowEmptyState?: boolean;
}

export const FeaturedEvents = ({
  showHeader = true,
  featured = true,
  allowEmptyState = false,
  className,
}: FeaturedEventsProps) => {
  const t = useTranslations("home.events.featuredEvents");
  const locale = useLocale();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const responseCacheRef = useRef<Map<string, EventForUI[]>>(new Map());
  const [events, setEvents] = useState<EventForUI[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalSlides = events.length;

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (featured) params.set("featured", "true");
    params.set("locale", locale);
    const cacheKey = `${locale}:${featured}`;

    const cached = responseCacheRef.current.get(cacheKey);
    if (cached) {
      setEvents(cached);
      return () => controller.abort();
    }

    fetch(`/api/events?${params.toString()}`, {
      signal: controller.signal,
      cache: "default",
    })
      .then(async (res) => {
        if (!res.ok) return;
        const data: EventForUI[] = await res.json();
        responseCacheRef.current.set(cacheKey, data);
        setEvents(data);
      })
      .catch(() => {
        // Silently ignore; section won't render without data.
      });

    return () => controller.abort();
  }, [locale, featured]);

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

  if (!events.length) {
    if (!allowEmptyState) return null;

    return (
      <ComponentLayout
        className={cn("py-12 mb-20 md:mb-24 lg:mb-40", className)}
      >
        {showHeader && (
          <div className="mb-10">
            <Title text={t("title")} />
            <Subtitle text={t("subtitle")} className="text-lg" />
          </div>
        )}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="bg-neutral-50 p-6 rounded-full border border-neutral-100 shadow-sm transition-transform hover:scale-105 duration-300">
            <CalendarDays className="size-12 text-neutral-300" />
          </div>
          <div className="max-w-md">
            <p className="text-neutral-500 text-lg leading-relaxed">
              {t("emptyState.description")}
            </p>
          </div>
        </div>
      </ComponentLayout>
    );
  }

  return (
    <ComponentLayout
      className={cn("overflow-hidden mb-20 md:mb-24 lg:mb-40", className)}
    >
      <div className="space-y-5">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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

            <Link href="/events" className="w-fit">
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

        <div className="relative">
          <div className="-mx-4 md:-mx-10 lg:-mx-20 overflow-hidden">
            <div
              ref={scrollContainerRef}
              onScroll={updateScrollArrows}
              className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 md:px-10 lg:px-20 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ msOverflowStyle: "none" }}
            >
              {events.map((event, idx) => (
                <div
                  key={event._id}
                  ref={(el) => {
                    cardRefsRef.current[idx] = el;
                  }}
                  className="min-w-[320px] md:min-w-[360px] lg:min-w-[405px] w-[320px] md:w-[360px] lg:w-[405px] shrink-0 flex"
                >
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll dots & arrows */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6 gap-6 md:gap-0">
            <div className="flex md:flex-none justify-center items-center gap-2">
              {events.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "bg-neutral-900 scale-120"
                      : "bg-neutral-300 hover:bg-neutral-400",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={!canScrollLeft}
                className="p-2 text-neutral-1000 cursor-pointer transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 hover:bg-neutral-100"
                aria-label="Previous slide"
              >
                <FaArrowLeft className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={!canScrollRight}
                className="p-2 text-neutral-1000 cursor-pointer transition disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 hover:bg-neutral-100"
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
