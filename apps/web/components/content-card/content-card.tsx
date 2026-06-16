"use client";

import Image, { StaticImageData } from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { FaCalendarDays } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import {
  formatEventDateLong,
  parseEventDateOverlay,
} from "@/lib/format-event-date";

export interface ContentCardProps {
  variant?: "default" | "event";
  image: string | StaticImageData;
  category?: string;
  tag?: string;
  title: string;
  description: string;
  location?: string;
  link: string;
  ctaLabel?: string;
  eventDate?: string;
}

export const ContentCard = ({
  image,
  category,
  tag,
  title,
  description,
  location,
  link,
  ctaLabel,
  eventDate,
  variant = "default",
}: ContentCardProps) => {
  const isEvent = variant === "event";
  const badgeLabel = [category, tag].filter(Boolean).join(" | ");
  const dateOverlay = eventDate ? parseEventDateOverlay(eventDate) : undefined;
  const dateLabel = eventDate ? formatEventDateLong(eventDate) : undefined;

  const renderDateBadge = ({
    day,
    ordinal,
    monthYear,
  }: NonNullable<typeof dateOverlay>) => (
    <div className="flex flex-col items-start">
      <p className="font-montserrat text-[36px] font-bold leading-none tracking-tight">
        {day}
        <sup className="ml-px text-xs font-bold leading-none align-super">
          {ordinal}
        </sup>
      </p>
      <p className="mt-1 font-montserrat text-sm font-light leading-tight">
        {monthYear}
      </p>
    </div>
  );

  return (
    <div className="group flex flex-col h-full rounded-[8px] border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* IMAGE */}
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={405}
          height={275}
          sizes="(max-width: 768px) 100vw, 405px"
          className="h-[240px] w-full object-cover"
        />

        {isEvent && dateOverlay && (
          <div className="absolute top-4 left-4 rounded-lg bg-black/50 px-3 py-2.5 text-white backdrop-blur-md">
            {renderDateBadge(dateOverlay)}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 justify-between p-4 gap-8 bg-white rounded-t-2xl -mt-4.5 z-10">
        <div>
          {badgeLabel && (
            <span className="inline-block w-fit px-2 py-1 text-xs 2xl:text-sm font-poppins rounded-[4px] text-neutral-100 bg-tertiary-600 mb-3 rounded">
              {badgeLabel}
            </span>
          )}

          <h5 className="text-[20px] font-semibold leading-[130%] text-neutral-900 mb-2">
            {title}
          </h5>

          <p className="text-neutral-800 leading-6 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col gap-y-1 text-sm text-neutral-700">
            {location && (
              <div className="flex items-center gap-2">
                <MdLocationPin size={16} />
                <span>{location}</span>
              </div>
            )}

            {dateLabel && (
              <div className="flex items-center gap-2">
                <FaCalendarDays size={16} />
                <span>{dateLabel}</span>
              </div>
            )}
          </div>

          <Link href={link}>
            <span className="inline-flex items-center gap-2  font-semibold text-primary-600 hover:underline">
              {ctaLabel ?? "View event"}
              <ChevronRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
