"use client";

import React, { useRef, useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";
import type {
  YearWithProjectsForUI,
  ProjectForGalleryPicker,
} from "@/lib/sanity";
import Image from "next/image";
import { GalleryPattern } from "@/assets/svg";

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

type StackedYearCardProps = {
  imageSrc: string;
  year: number;
  onClick: () => void;
  className?: string;
};

function StackedYearCard({
  imageSrc,
  year,
  onClick,
  className,
}: StackedYearCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col gap-3 items-center shrink-0 w-[min(639px,85vw)] text-left cursor-pointer group",
        className,
      )}
      aria-label={`View projects for ${year}`}
    >
      <div className="relative h-[382px] w-[636px] max-w-[85vw] shrink-0">
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
              <Image
                src={imageSrc}
                alt=""
                width={615}
                height={343}
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="font-montserrat text-[2.875rem] font-bold leading-tight text-neutral-100 text-center">
        {year}
      </p>
    </button>
  );
}

/* Project picker modal: "Choose a project to view" */
function ProjectPickerModal({
  projects,
  onClose,
  onSelectProject,
}: {
  projects: ProjectForGalleryPicker[];
  onClose: () => void;
  onSelectProject: (project: ProjectForGalleryPicker) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-picker-title"
    >
      <div className="relative bg-[#282828] w-[90vw] h-[85vh] rounded-[8px] pt-10 px-15 overflow-auto shadow-xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex items-center font-montserrat cursor-pointer font-bold gap-2 text-white hover:opacity-90 transition-opacity"
        >
          <span className="flex items-center justify-center size-5 border-2 border-neutral-400">
            <X className="size-4 font-medium" />
          </span>
          Close
        </button>
        <div className="sticky top-0 z-[1] pr-28 pb-2 bg-[#282828]">
          <h2
            id="project-picker-title"
            className="font-montserrat text-xl md:text-2xl lg:text-[32px] font-bold text-white"
          >
            Choose a project to view
          </h2>
        </div>
        <div className="p-6 flex flex-wrap gap-10 justify-start">
          {projects.map((project) => {
            const titleParts = project.title.split(" FOR ");
            const titleLine1 =
              titleParts.length >= 2 ? `${titleParts[0]} FOR` : null;
            const titleLine2 =
              titleParts.length >= 2
                ? titleParts.slice(1).join(" FOR ")
                : project.title;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => onSelectProject(project)}
                className="flex flex-col text-left transition-opacity hover:opacity-95 w-[361px] shrink-0"
              >
                <div className="relative aspect-video w-full mb-7 overflow-hidden">
                  {project.thumbnailImageUrl ? (
                    <>
                      {/* Same stacked frame as year card: 3 rotated back layers + front image */}
                      {BACK_LAYERS.map((layer, i) => {
                        const style: React.CSSProperties =
                          i === 0
                            ? {
                                left: "-2.7%",
                                top: "-3.6%",
                                width: "100%",
                                height: "100%",
                              }
                            : i === 1
                              ? {
                                  left: 0,
                                  top: 0,
                                  width: "100%",
                                  height: "100%",
                                }
                              : {
                                  left: "-0.03%",
                                  top: "-0.1%",
                                  width: "100%",
                                  height: "100%",
                                };
                        return (
                          <div
                            key={layer.bg}
                            className="absolute flex items-center justify-center"
                            style={style}
                          >
                            <div
                              className={cn(
                                "flex-none w-full h-full",
                                layer.rotation,
                              )}
                            >
                              <div
                                className={cn(
                                  "w-full h-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]",
                                  layer.bg,
                                )}
                              />
                            </div>
                          </div>
                        );
                      })}
                      <div
                        className="absolute flex items-center justify-center"
                        style={{
                          left: "1.4%",
                          top: "4.8%",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          className={cn(
                            "flex-none w-full h-full",
                            ROTATIONS[3],
                          )}
                        >
                          <div className="w-full h-full relative overflow-hidden border border-white/20 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-neutral-400">
                            <Image
                              src={project.thumbnailImageUrl}
                              alt=""
                              width={800}
                              height={450}
                              className="absolute inset-0 size-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-neutral-700 text-neutral-500 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  {titleLine1 && (
                    <p className="font-montserrat text-white uppercase text-sm font-medium leading-tight mb-0.5">
                      {titleLine1}
                    </p>
                  )}
                  <h3 className="font-montserrat font-bold text-white uppercase text-lg md:text-xl leading-tight">
                    {titleLine2}
                  </h3>
                </div>
                <p className="font-poppins text-sm text-white leading-relaxed">
                  {project.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Full-screen gallery viewer for one project (Figma: 678-1181) — Embla Carousel */
function ProjectGalleryViewer({
  project,
  onBack,
  onClose,
}: {
  project: ProjectForGalleryPicker;
  onBack: () => void;
  onClose: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = project.galleryItems;
  const hasMultiple = items.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
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

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
        <div className="relative flex h-full w-full max-w-[1280px] flex-col items-center justify-center gap-10 rounded-lg bg-neutral-1000 pt-[60px] pb-10 px-[60px]">
          <button
            type="button"
            onClick={onBack}
            className="absolute left-7 top-4 z-10 flex cursor-pointer items-center gap-2 font-montserrat text-lg font-bold text-white hover:opacity-90"
          >
            <ArrowLeft className="size-6" /> Back
          </button>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-7 top-4 z-10 flex cursor-pointer items-center gap-2 font-montserrat text-lg font-bold text-white hover:opacity-90"
          >
            <span className="flex size-6 items-center justify-center border-2 border-neutral-400">
              <X className="size-4" />
            </span>
            Close
          </button>
          <p className="text-neutral-400">No images in this gallery.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
      <div className="relative flex h-full w-full max-w-[1280px] flex-col items-center gap-10 overflow-auto rounded-lg bg-neutral-1000 pt-[60px] pb-10 px-[60px]">
        {/* Back: top left */}
        <button
          type="button"
          onClick={onBack}
          className="absolute left-7 top-4 z-10 flex cursor-pointer items-center gap-2 font-montserrat text-lg font-bold text-white hover:opacity-90"
          aria-label="Back"
        >
          <ArrowLeft className="size-6" /> Back
        </button>
        {/* Close: top right — X in square with border on 4 ends */}
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
        {/* Embla carousel: swipeable, image fits container */}
        <div className="flex flex-1 min-h-0 w-full max-w-[1160px]">
          <div className="relative aspect-video w-full overflow-hidden">
            <div
              ref={emblaRef}
              className="embla__viewport relative z-0 h-full w-full overflow-hidden touch-pan-y pinch-zoom"
            >
              <div className="embla__container flex h-full touch-pan-y">
                {items.map((slideItem, i) => (
                  <div
                    key={`${i}-${slideItem.url}`}
                    className="embla__slide flex min-w-0 flex-[0_0_100%] items-center justify-center"
                  >
                    {slideItem.type === "video" ? (
                      <video
                        src={slideItem.url}
                        controls
                        className="h-full w-full object-contain"
                        playsInline
                      />
                    ) : (
                      <Image
                        src={slideItem.url}
                        alt={slideItem.caption ?? project.title}
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
        {/* Bottom bar: dots left, "Swipe to view more" right (Figma H-7 22px) */}
        {hasMultiple && (
          <div className="flex w-full max-w-[1280px] shrink-0 items-center justify-between">
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "size-2 rounded-full transition-colors",
                    i === selectedIndex ? "bg-white" : "bg-neutral-600",
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
            <p className="font-montserrat text-[22px] font-bold leading-tight text-white">
              Swipe to view more
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

type PhotoGalleryProps = {
  /** Years with projects and card images (from Sanity) */
  years: YearWithProjectsForUI[];
  label?: string;
  title?: string;
  subtitle?: string;
  className?: string;
};

export function PhotoGallery({
  years,
  label = "Photo Gallery",
  title = "Moments of impact",
  subtitle = "Capturing stories of transformation across communities",
  className,
}: PhotoGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] =
    useState<ProjectForGalleryPicker | null>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === "left" ? -el.clientWidth * 0.6 : el.clientWidth * 0.6,
      behavior: "smooth",
    });
  }, []);

  const selectedYearData =
    selectedYear != null ? years.find((y) => y.year === selectedYear) : null;

  return (
    <>
      <section
        className={cn(
          "relative bg-primary-500 text-neutral-100 overflow-hidden pt-[60px] pb-[60px]",
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

        <ComponentLayout className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between max-w-[768px] sm:max-w-none">
            <div className="flex flex-col gap-2 max-w-[768px]">
              <p className="font-montserrat text-base font-bold leading-normal text-neutral-100">
                {label}
              </p>
              <h2 className="font-montserrat text-2xl font-bold leading-tight text-neutral-100 md:text-3xl">
                {title}
              </h2>
              <p className="font-poppins text-lg font-medium leading-snug text-neutral-200">
                {subtitle}
              </p>
            </div>
            <div className="flex gap-11 items-center shrink-0">
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
        </ComponentLayout>

        <div
          ref={scrollContainerRef}
          className="mt-[32px] h-[449px] w-full overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none]"
        >
          <div className="flex gap-6 items-center h-full pb-4 min-w-max px-4 md:px-10 lg:px-20">
            {years.map((y) => (
              <StackedYearCard
                key={y.year}
                imageSrc={y.cardImageUrl}
                year={y.year}
                onClick={() => setSelectedYear(y.year)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedYearData && selectedProject == null && (
        <ProjectPickerModal
          projects={selectedYearData.projects}
          onClose={() => setSelectedYear(null)}
          onSelectProject={(project) => setSelectedProject(project)}
        />
      )}

      {selectedProject != null && (
        <ProjectGalleryViewer
          project={selectedProject}
          onBack={() => setSelectedProject(null)}
          onClose={() => {
            setSelectedProject(null);
            setSelectedYear(null);
          }}
        />
      )}
    </>
  );
}
