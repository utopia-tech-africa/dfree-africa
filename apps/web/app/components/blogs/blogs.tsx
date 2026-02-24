"use client";

import { useEffect, useRef, useState } from "react";
import ComponentLayout from "@/components/component-layout";
import { ContentCard } from "@/components/content-card/content-card";
import { blogData } from "@/lib/blog";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Blogs = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);

      const cardWidth = 320;
      const gap = 24;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(newIndex, blogData.posts.length - 1));
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = 320;
      const gap = 24;
      const scrollAmount = cardWidth + gap;

      scrollContainerRef.current.scrollTo({
        left:
          scrollContainerRef.current.scrollLeft +
          (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <ComponentLayout className="py-16 overflow-hidden">
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
        {/* scroll Container */}
        <div className="-mx-4 md:-mx-10 lg:-mx-20">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto px-4 md:px-10 lg:px-20 pb-6 scrollbar-hide scroll-smooth"
          >
            {blogData.posts.map((post, index) => (
              <div
                key={index}
                className="min-w-[320px] md:min-w-90 lg:min-w-101.25 w-[320px] md:w-90 lg:w-101.25 flex border border-[#E8E8E8] rounded"
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
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = 320;
                    const gap = 24;
                    scrollContainerRef.current.scrollTo({
                      left: index * (cardWidth + gap),
                      behavior: "smooth",
                    });
                  }
                }}
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
              onClick={() => scroll("left")}
              disabled={!showLeftArrow}
              className="p-2 text-neutral-1000 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition"
              aria-label="Scroll left"
            >
              <ArrowLeft size={25} />
            </button>

            <button
              onClick={() => scroll("right")}
              disabled={!showRightArrow}
              className="p-2 text-neutral-1000 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-100 transition"
              aria-label="Scroll right"
            >
              <ArrowRight size={25} />
            </button>
          </div>
        </div>
      </div>
    </ComponentLayout>
  );
};
