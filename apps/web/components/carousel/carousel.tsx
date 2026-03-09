"use client";

"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
type EmblaOptionsType = any; // Fallback to avoid strict dependency issues in this setup

interface CarouselProps {
  children: React.ReactNode[];
  options?: EmblaOptionsType;
  className?: string;
  containerClassName?: string;
  slideClassName?: string;
  viewportClassName?: string;
  navigationClassName?: string;
  showNavigation?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export const Carousel = ({
  children,
  options,
  className,
  containerClassName,
  slideClassName,
  viewportClassName,
  navigationClassName,
  showNavigation = true,
  autoplay = false,
  autoplayInterval = 3000,
}: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    loop: autoplay, // Enable loop if autoplay is on
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Manual Autoplay
    let interval: NodeJS.Timeout;
    if (autoplay) {
      interval = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
      }, autoplayInterval);
    }

    return () => clearInterval(interval);
  }, [emblaApi, onSelect, autoplay, autoplayInterval]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Slider Container */}
      <div className="relative">
        <div
          className={cn("overflow-hidden", viewportClassName)}
          ref={emblaRef}
        >
          <div className={cn("flex gap-6", containerClassName)}>
            {children.map((child, index) => (
              <div
                key={index}
                className={cn("min-w-0 shrink-0 grow-0", slideClassName)}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      {showNavigation && (
        <div className={cn("pt-4", navigationClassName)}>
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {children.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "size-2.5 rounded-full transition-all duration-300 cursor-pointer",
                    index === selectedIndex
                      ? "bg-neutral-900"
                      : "bg-neutral-300",
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-4">
              <button
                onClick={scrollPrev}
                className="p-3transition-colors"
                aria-label="Previous slide"
              >
                <FaArrowLeft className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
              </button>
              <button
                onClick={scrollNext}
                className="p-3 transition-colors"
                aria-label="Next slide"
              >
                <FaArrowRight className="size-8 text-neutral-900 hover:opacity-80 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
