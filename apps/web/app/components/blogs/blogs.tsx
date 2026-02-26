"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ComponentLayout from "@/components/component-layout";
import { ContentCard } from "@/components/content-card/content-card";
import { blogData } from "@/lib/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SCROLL_EDGE_THRESHOLD = 10;

export const Blogs = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalSlides = blogData.posts.length;

  const updateScrollArrows = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > SCROLL_EDGE_THRESHOLD);
    setCanScrollRight(
      scrollLeft < scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD,
    );

    // Update active dot from scroll position (which card is most in view)
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

  // Arrows disabled based on actual scroll content (blog cards), not dot index
  const canGoPrev = canScrollLeft;
  const canGoNext = canScrollRight;

  return (
    <ComponentLayout className="overflow-hidden">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-tertiary-500 font-bold text-base leading-[150%]">
              {blogData.label}
            </p>
            <h2 className="text-black text-[18px] md:text-[26px] lg:text-[32px] font-bold leading-[120%] mt-2">
              {blogData.title}
            </h2>
          </div>

          <p className="text-black font-medium text-lg max-w-md">
            {blogData.subtitle}
          </p>
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
            {blogData.posts.map((post, index) => (
              <div
                key={index}
                ref={(el) => {
                  cardRefsRef.current[index] = el;
                }}
                className="min-w-[320px] md:min-w-90 lg:min-w-101.25 w-[320px] md:w-90 lg:w-101.25 shrink-0 flex border border-[#E8E8E8] rounded"
              >
                <ContentCard
                  image={post.image}
                  badge={post.readTime}
                  badgeVariant="secondary"
                  title={post.title}
                  description={post.description}
                  link={post.link}
                  padding={true}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            {blogData.posts.map((_, index) => (
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
      </div>
    </ComponentLayout>
  );
};
