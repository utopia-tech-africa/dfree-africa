"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { NewsCardProps } from "./news-card";
import { NewsCard } from "./news-card";
import ComponentLayout from "@/components/component-layout";
import { cn } from "@/lib/utils";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Newspaper } from "lucide-react";

const SCROLL_EDGE_THRESHOLD = 10;

interface FeaturedNewsProps {
  currentSlug?: string;
  compact?: boolean;
  className?: string;
  showHeader?: boolean;
  featured?: boolean;
  allowEmptyState?: boolean;
  category?: string | null;
}

export const FeaturedNews = ({
  currentSlug,
  compact = false, // reserved for future layout tweaks
  showHeader = true,
  featured,
  allowEmptyState = false,
  className,
}: FeaturedNewsProps) => {
  const t = useTranslations("home.news.featuredNews");
  const locale = useLocale();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const responseCacheRef = useRef<Map<string, NewsCardProps[]>>(new Map());
  const [news, setNews] = useState<NewsCardProps[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalSlides = news.length;
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (currentSlug) params.set("currentSlug", currentSlug);
    if (featured !== undefined) params.set("featured", featured.toString());
    params.set("locale", locale);
    const cacheKey = `${locale}:${currentSlug ?? ""}:${featured ?? ""}`;

    const cached = responseCacheRef.current.get(cacheKey);
    if (cached) {
      setNews(cached);
      return () => controller.abort();
    }

    fetch(`/api/news?${params.toString()}`, {
      signal: controller.signal,
      cache: "default",
    })
      .then(async (res) => {
        if (!res.ok) return;
        const data: NewsCardProps[] = await res.json();
        responseCacheRef.current.set(cacheKey, data);
        setNews(data);
      })
      .catch(() => {
        // Silently ignore in production; news section just won't render.
      });

    return () => controller.abort();
  }, [currentSlug, locale, featured]);

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
  }, [updateScrollArrows, news]);

  if (!news.length) {
    if (!showHeader && !allowEmptyState) return null;
    return (
      <ComponentLayout className={cn("py-12", className)}>
        {showHeader && (
          <div className="mb-10">
            <Title text={t("title")} />
            <Subtitle text={t("subtitle")} className="text-lg" />
          </div>
        )}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <div className="bg-neutral-50 p-6 rounded-full border border-neutral-100 shadow-sm transition-transform hover:scale-105 duration-300">
            <Newspaper className="size-12 text-neutral-300" />
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
    <ComponentLayout className="overflow-hidden">
      <div className="space-y-10">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Title text={t("title")} />
              <Subtitle text={t("subtitle")} />
            </div>

            <Link href={"/news"} className="w-fit">
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
                {t("viewAllNewsCta")}
              </Button>
            </Link>
          </div>
        )}
        {/* Cards */}
        <div className="relative mt-10">
          <div className="-mx-4 md:-mx-10 lg:-mx-20 overflow-hidden">
            <div
              ref={scrollContainerRef}
              onScroll={updateScrollArrows}
              className="flex gap-6 overflow-x-auto overflow-y-hidden px-4 md:px-10 lg:px-20 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ msOverflowStyle: "none" }}
            >
              {news.map((newsItem, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    cardRefsRef.current[idx] = el;
                  }}
                  className="min-w-[320px] md:min-w-[360px] lg:min-w-[405px] w-[320px] md:w-[360px] lg:w-[405px] shrink-0"
                >
                  <NewsCard {...newsItem} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {news.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    activeIndex === index
                      ? "bg-neutral-900 scale-110"
                      : "bg-neutral-300 hover:bg-neutral-400",
                  )}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                disabled={!canScrollLeft}
                className="p-2 transition disabled:pointer-events-none disabled:opacity-40 hover:bg-neutral-100"
              >
                <FaArrowLeft className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
              </button>

              <button
                onClick={goNext}
                disabled={!canScrollRight}
                className="p-2 transition disabled:pointer-events-none disabled:opacity-40 hover:bg-neutral-100"
              >
                {" "}
                <FaArrowRight className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};
