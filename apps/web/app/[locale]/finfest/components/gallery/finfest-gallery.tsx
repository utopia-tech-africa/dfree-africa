"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";
import { GalleryPattern } from "@/assets/svg";
import Image from "next/image";
import type {
  FinfestGalleryForUI,
  FinfestGalleryYearForUI,
} from "@/lib/sanity";
import type { GalleryItemForUI } from "@/lib/sanity";

const ROTATIONS = [
  "rotate-[1.31deg]",
  "-rotate-[3.7deg]",
  "rotate-[3.63deg]",
  "-rotate-[0.57deg]",
] as const;

const LAYER_POSITIONS = [
  { left: "16.58px", top: "12.48px" },
  { left: "0", top: "0" },
  { left: "0.18px", top: "0.35px" },
  { left: "8.72px", top: "16.4px" },
] as const;

const BACK_LAYERS: Array<{
  left: string;
  top: string;
  bg: string;
  rotation: string;
}> = [
  {
    left: LAYER_POSITIONS[0].left,
    top: LAYER_POSITIONS[0].top,
    bg: "bg-transparent",
    rotation: ROTATIONS[0],
  },
  {
    left: LAYER_POSITIONS[1].left,
    top: LAYER_POSITIONS[1].top,
    bg: "bg-neutral-600",
    rotation: ROTATIONS[1],
  },
  {
    left: LAYER_POSITIONS[2].left,
    top: LAYER_POSITIONS[2].top,
    bg: "bg-neutral-500",
    rotation: ROTATIONS[2],
  },
];

type YearCardProps = {
  imageSrc: string | null;
  year: number;
  onClick: () => void;
  className?: string;
};

function YearCard({ imageSrc, year, onClick, className }: YearCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col gap-[12px] md:gap-3 items-center shrink-0 w-[325px] md:w-[min(639px,85vw)] text-left cursor-pointer group",
        className,
      )}
      aria-label={`View gallery for ${year}`}
    >
      <div className="h-[195px] w-[325px] md:h-[382px] md:w-[636px] max-w-[85vw] shrink-0 overflow-hidden relative">
        <div
          className="h-[382px] w-[636px] origin-top-left scale-[0.51] md:scale-100 md:origin-center relative"
          style={{ minWidth: 636, minHeight: 382 }}
        >
          {BACK_LAYERS.map((layer) => (
            <div
              key={layer.bg}
              className="absolute flex items-center justify-center"
              style={{ left: layer.left, top: layer.top }}
            >
              <div className={cn("flex-none", layer.rotation)}>
                <div
                  className={cn(
                    "h-[343px] w-[615px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]",
                    layer.bg,
                  )}
                />
              </div>
            </div>
          ))}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: LAYER_POSITIONS[3].left,
              top: LAYER_POSITIONS[3].top,
            }}
          >
            <div className={cn("flex-none", ROTATIONS[3])}>
              <div className="h-[343px] w-[615px] relative overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-neutral-400 transition-transform group-hover:scale-[1.02]">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt=""
                    width={615}
                    height={343}
                    className="absolute inset-0 size-full object-cover"
                    unoptimized={imageSrc.startsWith("https://cdn.sanity.io")}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-600 text-neutral-400 font-montserrat text-sm">
                    No image
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="font-montserrat text-[26px] md:text-[2.875rem] font-bold leading-tight text-neutral-100 text-center">
        {year}
      </p>
    </button>
  );
}

function MediaGalleryViewer({
  items,
  initialIndex,
  onClose,
  galleryTitle,
}: {
  items: GalleryItemForUI[];
  initialIndex: number;
  onClose: () => void;
  galleryTitle: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const hasMultiple = items.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    startIndex: initialIndex,
  });

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!emblaApi || !hasMultiple) return;

    let timer: ReturnType<typeof setInterval>;

    const startAutoplay = () => {
      timer = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
    };

    const resetAutoplay = () => {
      clearInterval(timer);
      startAutoplay();
    };

    startAutoplay();
    emblaApi.on("select", resetAutoplay);

    return () => {
      clearInterval(timer);
      emblaApi.off("select", resetAutoplay);
    };
  }, [emblaApi, hasMultiple]);

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 z-50 grid h-dvh place-items-center bg-black/85 p-4">
        <div className="relative flex h-[85dvh] max-h-[85dvh] w-full max-w-[1280px] flex-col items-center justify-center gap-10 rounded-lg bg-neutral-1000 px-[60px] pt-[60px] pb-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-7 top-4 z-10 flex cursor-pointer items-center gap-2 font-montserrat text-lg font-bold text-white hover:opacity-90"
            aria-label="Close"
          >
            <span className="flex size-6 items-center justify-center border-2 border-neutral-400">
              <X className="size-4" />
            </span>
            Close
          </button>
          <p className="text-neutral-400">No media in this gallery.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 grid h-dvh place-items-center bg-black/85 p-4">
      <div className="relative flex h-[85dvh] max-h-[85dvh] w-full max-w-[1280px] flex-col items-center gap-4 overflow-hidden rounded-lg bg-neutral-1000 px-4 pt-4 pb-4 md:gap-10 md:px-[60px] md:pt-[60px] md:pb-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 md:right-7 md:top-4 z-10 flex cursor-pointer items-center gap-2 font-montserrat text-base md:text-lg font-bold text-white hover:opacity-90"
          aria-label="Close"
        >
          <span className="flex size-5 md:size-6 items-center justify-center border-2 border-neutral-400">
            <X className="size-3 md:size-4" />
          </span>
          <span className="hidden sm:inline">Close</span>
        </button>

        <div className="flex flex-1 min-h-0 w-full max-w-[1160px] overflow-hidden">
          <div className="relative aspect-video w-full min-h-0 overflow-hidden rounded-lg">
            <div
              ref={emblaRef}
              className="embla__viewport relative z-0 h-full w-full overflow-hidden touch-pan-y pinch-zoom"
            >
              <div className="embla__container flex h-full touch-pan-y">
                {items.map((slideItem, i) => (
                  <div
                    key={`${i}-${slideItem.url}`}
                    className="embla__slide flex min-w-0 flex-[0_0_90%] md:flex-[0_0_100%] items-center justify-center overflow-hidden"
                  >
                    {slideItem.type === "video" ? (
                      <video
                        src={slideItem.url}
                        controls
                        className="h-full w-full max-h-full max-w-full object-contain"
                        playsInline
                      />
                    ) : (
                      <Image
                        src={slideItem.url}
                        alt={slideItem.caption ?? galleryTitle}
                        width={1160}
                        height={571}
                        className="h-full w-full object-contain"
                        unoptimized={slideItem.url.startsWith(
                          "https://cdn.sanity.io",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {hasMultiple && (
          <div className="flex w-full max-w-[1280px] shrink-0 items-center justify-center gap-2 px-0">
            <div className="flex gap-1 md:gap-1.5 shrink-0">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "size-1.5 md:size-2 rounded-full transition-colors shrink-0",
                    i === selectedIndex ? "bg-white" : "bg-neutral-600",
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type FinfestGallerySectionProps = {
  gallery: FinfestGalleryForUI;
  label?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

export function FinfestGallerySection({
  gallery,
  label = "Gallery",
  title,
  subtitle,
  className,
}: FinfestGallerySectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedYearData, setSelectedYearData] =
    useState<FinfestGalleryYearForUI | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const AUTOPLAY_INTERVAL = 4000;
  const SCROLL_EDGE_THRESHOLD = 10;

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -el.clientWidth * 0.6 : el.clientWidth * 0.6,
      behavior: "smooth",
    });
  }, []);

  // Auto-scroll: advance right every AUTOPLAY_INTERVAL ms, loop back at end
  useEffect(() => {
    if (isHovered || selectedYearData != null) return;

    const interval = setInterval(() => {
      const el = scrollContainerRef.current;
      if (!el) return;

      const atEnd =
        el.scrollLeft >=
        el.scrollWidth - el.clientWidth - SCROLL_EDGE_THRESHOLD;

      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: el.clientWidth * 0.6, behavior: "smooth" });
      }
    }, AUTOPLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovered, selectedYearData]);

  const displayTitle = title ?? gallery.title;
  const displaySubtitle = subtitle ?? "Click a year to view its gallery.";

  return (
    <>
      <section
        className={cn(
          "relative bg-primary-500 text-neutral-100 overflow-hidden py-[32px] md:pt-[60px] md:pb-[60px]",
          className,
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative SVG pattern */}
          <img
            src={
              typeof GalleryPattern === "string"
                ? GalleryPattern
                : ((GalleryPattern as { src?: string; default?: string })
                    ?.src ??
                  (GalleryPattern as { src?: string; default?: string })
                    ?.default ??
                  "")
            }
            alt=""
            className="size-full object-cover"
          />
        </div>

        <ComponentLayout className="relative flex flex-col gap-[32px]">
          <div
            className={cn(
              "flex flex-col gap-2 max-w-[768px] w-full",
              "items-center text-center md:items-start md:text-left",
              "sm:flex-row sm:items-end sm:justify-between md:max-w-none",
            )}
          >
            <div className="flex flex-col gap-2 max-w-[768px] w-full">
              <p className="font-montserrat text-base font-bold leading-normal text-primary-500 md:text-neutral-100">
                {label}
              </p>
              <h2 className="font-montserrat text-[26px] font-bold leading-tight text-neutral-100 md:text-3xl">
                {displayTitle}
              </h2>
              <p className="font-poppins text-sm font-normal leading-snug text-neutral-200 md:text-lg md:font-medium">
                {displaySubtitle}
              </p>
            </div>
            <div className="hidden md:flex gap-11 items-center shrink-0">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous"
                className="cursor-pointer p-0 text-neutral-100 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <ArrowLeft className="size-10 shrink-0" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next"
                className="cursor-pointer p-0 text-neutral-100 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <ArrowRight className="size-10 shrink-0" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-[237px] md:h-[449px] w-full overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-6 items-center h-full pb-4 min-w-max">
              {gallery.years.map((y) => (
                <YearCard
                  key={y.year}
                  imageSrc={y.thumbnailUrl}
                  year={y.year}
                  onClick={() => setSelectedYearData(y)}
                />
              ))}
            </div>
          </div>
        </ComponentLayout>

        <div className="flex md:hidden items-center justify-between w-full px-4 md:px-10 lg:px-20 max-w-[1280px] mx-auto mt-4">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous"
            className="cursor-pointer p-0 text-neutral-100 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 size-8 flex items-center justify-center"
          >
            <ArrowLeft className="size-8 shrink-0" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next"
            className="cursor-pointer p-0 text-neutral-100 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 size-8 flex items-center justify-center"
          >
            <ArrowRight className="size-8 shrink-0" strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {selectedYearData !== null && (
        <MediaGalleryViewer
          items={selectedYearData.items}
          initialIndex={0}
          galleryTitle={`${selectedYearData.title} (${selectedYearData.year})`}
          onClose={() => setSelectedYearData(null)}
        />
      )}
    </>
  );
}
