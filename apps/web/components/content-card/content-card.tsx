"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ContentCardProps {
  image: StaticImageData;
  badge?: string;
  badgeVariant?: "default" | "secondary";
  title: string;
  description: string;
  location?: string;
  readTime?: string;
  link: string;
  date?: {
    day: string;
    dated: string;
    mode: string;
    year: string;
  };
  padding?: boolean; // Add this prop
}

export const ContentCard = ({
  image,
  badge,
  badgeVariant = "default",
  title,
  description,
  location,
  readTime,
  link,
  date,
  padding = false,
}: ContentCardProps) => {
  // determine if this is an event card (has date) or blog card (has readTime in badge)
  const isEvent = !!date;

  return (
    <div className="group w-full h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={405}
          height={275}
          className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {date && (
          <div className="absolute right-4 top-4 bg-white px-1 py-3 text-center shadow-md">
            <p className="text-sm font-normal leading-[130%] text-black">
              {date.day}
            </p>
            <p className="text-[24px] md:text-[28px] lg:text-[32px] font-bold leading-[130%]">
              {date.dated}
            </p>
            <p className="text-sm font-normal leading-[130%] text-black">
              {date.mode}
            </p>
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-col flex-1",
          padding ? "p-6" : "mt-4 space-y-3",
        )}
      >
        {badge && (
          <span
            className={cn(
              "inline-block w-fit px-3 py-1 text-xs font-semibold",
              padding ? "mb-3" : "",
              badgeVariant === "default"
                ? "bg-tertiary-500 text-white"
                : "bg-[#EEEEEE] text-black text-sm font-semibold",
            )}
          >
            {badge}
          </span>
        )}

        <h5
          className={cn(
            "text-xl font-semibold leading-snug line-clamp-2",
            padding ? "mb-3" : "",
          )}
        >
          {title}
        </h5>

        {location && (
          <div
            className={cn(
              "text-sm text-muted-foreground capitalize line-clamp-1",
              padding ? "mb-3" : "",
            )}
          >
            {location}
          </div>
        )}

        {readTime && (
          <div
            className={cn(
              "flex items-center gap-2 text-sm text-muted-foreground",
              padding ? "mb-3" : "",
            )}
          >
            <Calendar size={16} />
            <span>{readTime}</span>
          </div>
        )}

        <p
          className={cn(
            "text-neutral-900 font-medium text-lg leading-relaxed line-clamp-3",
            padding ? "mb-3" : "",
          )}
        >
          {description}
        </p>

        <Link href={link} className={padding ? "mt-auto" : "mt-auto pt-2"}>
          <Button
            variant="link"
            className="px-0 text-lg leading-[130%] font-semibold text-primary-600 gap-2 hover:no-underline"
          >
            {isEvent ? "View event" : "Read more"}
            <ChevronRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Button>
        </Link>
      </div>
    </div>
  );
};
