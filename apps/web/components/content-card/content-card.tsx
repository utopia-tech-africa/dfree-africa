"use client";

import Image, { StaticImageData } from "next/image";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { FaCalendarDays } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";

export interface ContentCardProps {
  variant?: "default" | "event";
  image: string | StaticImageData;
  badge?: string;
  title: string;
  description: string;
  location?: string;
  link: string;
  ctaLabel?: string;
  date?: {
    day: string;
    dated: string;
    mode: string;
    year: string;
  };
}

export const ContentCard = ({
  image,
  badge,
  title,
  description,
  location,
  link,
  ctaLabel,
  date,
  variant = "default",
}: ContentCardProps) => {
  const isEvent = variant === "event";

  const renderDateBadge = (str: string) => {
    const match = str.match(/^(.*?)(\d+)(st|nd|rd|th)(.*)$/i);
    if (!match) {
      return <p className="text-[18px] font-semibold">{str}</p>;
    }

    const restDate = (match[4] || "").trim().replace(/^,\s*/, "");

    return (
      <>
        <p className="text-[18px] font-bold md:text-[22px] font-montserrat">
          {match[1]}
          {match[2]}
          <sup className="text-base leading-[120%] font-poppins align-super">
            {match[3]}
          </sup>
        </p>
        {restDate && <p className="text-xs opacity-80">{restDate}</p>}
      </>
    );
  };

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

        {isEvent && date && (
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white p-4 rounded-lg leading-[1.1]">
            {renderDateBadge(date.day)}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 justify-between p-4 gap-8 bg-white rounded-t-2xl -mt-4.5 z-10">
        <div>
          {badge && (
            <span className="inline-block w-fit px-2 py-1 text-xs 2xl:text-sm font-poppinsrounded-[4px] text-neutral-100 bg-tertiary-600 mb-3 rounded">
              Finfest | {badge}
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

            {date && (
              <div className="flex items-center gap-2">
                <FaCalendarDays size={16} />
                <span>{"10th August 2026"}</span>
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
