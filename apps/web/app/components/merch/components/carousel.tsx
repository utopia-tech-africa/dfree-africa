"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import type { MerchItemForUI } from "@/lib/sanity";
import { MerchCard } from "./merch-card";

type CarouselProps = {
  items?: MerchItemForUI[];
};

export const Carousel = ({ items }: CarouselProps) => {
  const merch = items;
  const [current, setCurrent] = useState(1); // Center index
  const total = merch?.length || 0;

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  // Keyboard arrow support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  // Touch / swipe state
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const getPosition = (index: number) => {
    if (total === 0) return "";
    const diff = (index - current + total) % total;
    const position = diff <= total / 2 ? diff : diff - total;

    switch (position) {
      case 0:
        return "z-30 scale-100 opacity-100 translate-x-0";
      case -1:
        return "z-20 -translate-x-[68%] translate-y-3 md:-translate-x-[68%] scale-90 brightness-[0.85]";
      case 1:
        return "z-20 translate-x-[68%] translate-y-3 md:translate-x-[68%] scale-90 brightness-[0.85]";
      default:
        return "z-0 scale-65 opacity-0 pointer-events-none translate-x-0";
    }
  };

  return (
    <div
      className="relative flex-1 flex items-center justify-center min-h-[450px] md:min-h-[600px]"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
        touchDeltaX.current = 0;
      }}
      onTouchMove={(e) => {
        if (touchStartX.current !== null) {
          touchDeltaX.current =
            (e.touches[0]?.clientX ?? touchStartX.current) -
            touchStartX.current;
        }
      }}
      onTouchEnd={() => {
        const threshold = 50;
        if (touchDeltaX.current > threshold) handlePrev();
        else if (touchDeltaX.current < -threshold) handleNext();
        touchStartX.current = null;
        touchDeltaX.current = 0;
      }}
    >
      {/* Cards stacked in a fan */}
      <div className="relative flex items-center justify-center w-full h-full touch-pan-x">
        {merch?.map((item, index) => (
          <div
            key={item._id}
            onClick={() => setCurrent(index)}
            className={cn(
              "absolute transition-all duration-500 ease-in-out cursor-pointer",
              getPosition(index),
            )}
          >
            <MerchCard item={item} />
          </div>
        ))}
      </div>

      {/* Arrow navigation */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous product"
        className={cn(
          "absolute left-2 md:left-0 z-40 text-neutral-100 transition-all duration-300",
          "hover:scale-110 cursor-pointer hidden md:block opacity-100",
        )}
        style={{ fontSize: "36px" }}
      >
        <FaCircleArrowLeft />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next product"
        className={cn(
          "absolute right-2 md:right-0 z-40 text-neutral-100 transition-all duration-300",
          "hover:scale-110 cursor-pointer hidden md:block opacity-100",
        )}
        style={{ fontSize: "36px" }}
      >
        <FaCircleArrowRight />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        {merch?.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Go to product ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              current === i
                ? "w-5 bg-neutral-100"
                : "w-2 bg-primary-700 hover:bg-neutral-400",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
