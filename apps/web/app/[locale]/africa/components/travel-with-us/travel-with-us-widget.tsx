"use client";

import { AfricaMapSvg, TravelPlaneIcon } from "@/assets/svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const TRAVEL_HREF = "#";

export function TravelWithUsWidget() {
  const t = useTranslations("africa.travelWithUs");
  const [expanded, setExpanded] = useState(false);
  const [popoverAbove, setPopoverAbove] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePopoverPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const popoverHeight = 140;
    const spaceBelow = window.innerHeight - rect.bottom;

    setPopoverAbove(spaceBelow < popoverHeight + 16);
  }, []);

  useEffect(() => {
    if (!expanded) return;

    updatePopoverPosition();
    window.addEventListener("resize", updatePopoverPosition);
    window.addEventListener("scroll", updatePopoverPosition, { passive: true });

    return () => {
      window.removeEventListener("resize", updatePopoverPosition);
      window.removeEventListener("scroll", updatePopoverPosition);
    };
  }, [expanded, updatePopoverPosition]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-4 z-50 md:bottom-8 md:left-8"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="relative">
        {expanded && (
          <div
            className={cn(
              "absolute left-0 w-[238px] rounded-lg bg-[rgba(47,63,30,0.5)] px-3 py-1.5 backdrop-blur-[7.5px]",
              popoverAbove
                ? "bottom-[calc(100%+10px)]"
                : "top-[calc(100%+10px)]",
            )}
            role="tooltip"
          >
            <div className="flex flex-col items-center gap-2">
              <Image
                src={AfricaMapSvg}
                alt=""
                width={75}
                height={68}
                aria-hidden
              />
              <p className="font-montserrat text-center text-sm font-bold leading-normal text-white">
                {t("tooltip")}
              </p>
            </div>
          </div>
        )}

        <Link
          href={TRAVEL_HREF}
          // target="_blank"
          // rel="noopener noreferrer"
          aria-label={t("label")}
          onFocus={() => setExpanded(true)}
          onBlur={() => setExpanded(false)}
          className={cn(
            "flex items-center overflow-hidden rounded-full bg-primary-500 text-white transition-all duration-300 ease-out",
            expanded ? "h-[57px] w-[238px] pl-6" : "size-[57px] justify-center",
          )}
        >
          <TravelPlaneIcon className="text-white" />
          <span
            className={cn(
              "font-montserrat whitespace-nowrap text-xl font-bold transition-all duration-300 ease-out",
              expanded ? "ml-3 max-w-[146px] opacity-100" : "max-w-0 opacity-0",
            )}
          >
            {t("label")}
          </span>
        </Link>
      </div>
    </div>
  );
}
