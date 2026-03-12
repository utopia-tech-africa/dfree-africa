"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { BlogCard } from "./blog-card";
import ComponentLayout from "@/components/component-layout";
import { cn } from "@/lib/utils";
import { blogsQuery } from "@/lib/sanity/queries/blogs";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const SCROLL_EDGE_THRESHOLD = 10;

interface BlogListProps {
  currentSlug?: string;
  compact?: boolean;
  className?: string;
  showHeader?: boolean;
}

export const BlogList = ({
  currentSlug,
  compact,
  className,
  showHeader = true,
}: BlogListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalSlides = blogs.length;
  useEffect(() => {
    const params = { currentSlug: currentSlug ?? null };

    client.fetch(blogsQuery, params).then((data) => setBlogs(data));
  }, [currentSlug]);

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
  }, [updateScrollArrows, blogs]);

  if (!blogs.length) return null;

  return (
    <ComponentLayout className="overflow-hidden">
      <div className="space-y-10">
        {showHeader && (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Title text="Blog" />
              <Subtitle text="Insights and perspectives" />
            </div>

            <p className="text-black font-medium text-lg max-w-md">
              Embrace life&apos;s beauty and cherish connections.
            </p>
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
              {blogs.map((blog, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    cardRefsRef.current[idx] = el;
                  }}
                  className="min-w-[320px] md:min-w-[360px] lg:min-w-[405px] w-[320px] md:w-[360px] lg:w-[405px] shrink-0 border border-[#E8E8E8] rounded"
                >
                  <BlogCard {...blog} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {blogs.map((_, index) => (
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
