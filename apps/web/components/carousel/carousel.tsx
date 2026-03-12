"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const SCROLL_EDGE_THRESHOLD = 10;

interface CarouselProps {
  children: React.ReactNode[];
  className?: string; // Root wrapper
  viewportClassName?: string; // Bleed wrapper
  containerClassName?: string; // Scrollable flex container
  slideClassName?: string; // Each slide wrapper
  showNavigation?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  options?: any; // Kept for compatibility but unused
}

export const Carousel = ({
  children,
  className,
  viewportClassName,
  containerClassName,
  slideClassName,
  showNavigation = true,
  autoplay = false,
  autoplayInterval = 3000,
}: CarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalSlides = React.Children.count(children);

  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > SCROLL_EDGE_THRESHOLD);
    setCanScrollRight(
      scrollLeft < scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD,
    );

    const slides = slideRefs.current;
    const viewportCenter = scrollLeft + clientWidth / 2;

    let newIndex = 0;
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      if (slide) {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        if (viewportCenter >= slideCenter) newIndex = i;
      }
    }
    setActiveIndex(newIndex);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    const slide = slideRefs.current[index];

    if (!container || !slide) return;

    const paddingLeft =
      parseFloat(getComputedStyle(container).paddingLeft) || 0;

    const targetScroll = Math.max(0, slide.offsetLeft - paddingLeft);
    const maxScroll = container.scrollWidth - container.clientWidth;

    container.scrollTo({
      left: Math.min(targetScroll, maxScroll),
      behavior: "smooth",
    });

    setActiveIndex(index);
  }, []);

  const goPrev = () => scrollToIndex(Math.max(activeIndex - 1, 0));
  const goNext = () => {
    if (activeIndex === totalSlides - 1) {
      scrollToIndex(0);
    } else {
      scrollToIndex(Math.min(activeIndex + 1, totalSlides - 1));
    }
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollContainerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);

    return () => ro.disconnect();
  }, [updateScrollState, children]);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      goNext();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, activeIndex, totalSlides]);

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "-mx-4 md:-mx-10 lg:-mx-20 overflow-hidden",
          viewportClassName,
        )}
      >
        <div
          ref={scrollContainerRef}
          onScroll={updateScrollState}
          className={cn(
            "flex gap-6 overflow-x-auto overflow-y-hidden px-4 md:px-10 lg:px-20 pb-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            containerClassName,
          )}
          style={{ msOverflowStyle: "none" }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              className={cn(
                "shrink-0 select-none",
                slideClassName ||
                  "min-w-[320px] md:min-w-[360px] lg:min-w-[405px] w-[320px] md:w-[360px] lg:w-[405px]",
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex items-center justify-between mt-6">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {React.Children.map(children, (_, index) => (
              <button
                key={index}
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

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              disabled={!canScrollLeft}
              className="p-2 transition disabled:pointer-events-none disabled:opacity-40 hover:bg-neutral-100"
              aria-label="Previous slide"
            >
              <FaArrowLeft className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
            </button>
            <button
              onClick={goNext}
              disabled={!canScrollRight}
              className="p-2 transition disabled:pointer-events-none disabled:opacity-40 hover:bg-neutral-100"
              aria-label="Next slide"
            >
              <FaArrowRight className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
