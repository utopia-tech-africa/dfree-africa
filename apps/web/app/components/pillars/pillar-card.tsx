"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PillarCardProps = {
  /** Main headline (pillar name) */
  title: string;
  /** Supporting description text */
  description: string;
  /** CTA link URL */
  href: string;
  /** Background image (static import or URL) */
  backgroundImage: StaticImageData | string;
  /** Optional mobile-specific background image */
  backgroundImageMobile?: StaticImageData | string;
  /** Alt text for background image */
  backgroundImageAlt?: string;
  /** Optional logo shown top-left on white background */
  logo?: StaticImageData;
  /** Alt text for logo */
  logoAlt?: string;
  /** CTA button label */
  buttonText?: string;
  /** Additional class for the root element */
  className?: string;
  /** Index for stacking order when cards stick (higher = on top). */
  stackIndex?: number;
  /** Optional image object-position classes, e.g. mobile focal point. */
  imagePositionClassName?: string;
};

/** Card height measured in Pillars: viewport - navbar - pillar header. */
const CARD_HEIGHT = "var(--pillar-card-height)";

export function PillarCard({
  title,
  description,
  href,
  backgroundImage,
  backgroundImageMobile,
  backgroundImageAlt = "",
  logo,
  logoAlt = "",
  buttonText = "Discover more",
  className,
  stackIndex = 0,
  imagePositionClassName = "object-[center_30%] md:object-center",
}: PillarCardProps) {
  return (
    <article
      className={cn(
        "group relative flex w-full flex-col justify-end overflow-hidden",
        className,
      )}
      style={{
        height: CARD_HEIGHT,
        minHeight: CARD_HEIGHT,
        zIndex: 10 + stackIndex,
      }}
    >
      {/* Only image layer zooms on card hover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundImageMobile && (
          <Image
            src={backgroundImageMobile}
            alt={backgroundImageAlt || title}
            fill
            className={cn(
              "scale-100 object-cover transition-transform duration-700 ease-out md:hidden",
              imagePositionClassName,
            )}
            priority
            sizes="100vw"
          />
        )}
        <Image
          src={backgroundImage}
          alt={backgroundImageAlt || title}
          fill
          className={cn(
            "scale-100 object-cover transition-transform duration-700 ease-out md:scale-105 md:group-hover:scale-100",
            backgroundImageMobile && "hidden md:block",
            imagePositionClassName,
          )}
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 108vw, 100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-1 bg-linear-to-b from-transparent to-black/75"
        aria-hidden
      />

      {/* Logo - top left */}
      {logo && (
        <div className="absolute left-4 top-[18px] z-10 bg-white p-1.5 md:left-10 md:top-10 md:p-3 lg:left-20">
          <Image
            src={logo}
            alt={logoAlt || `${title} logo`}
            className="h-10 w-auto md:h-14"
          />
        </div>
      )}

      {/* Content - bottom left */}
      <div className="relative z-10 flex flex-col gap-6 px-4 py-6 md:px-10 md:py-10 lg:max-w-360 lg:px-20">
        <div className="flex max-w-[504px] flex-col gap-3 text-white">
          <h2 className="font-montserrat text-[22px] font-bold leading-[1.2] md:text-[32px]">
            {title}
          </h2>
          <p className="font-poppins text-sm leading-[1.2] text-white/95 md:text-lg md:leading-[1.3]">
            {description}
          </p>
        </div>

        <Link href={href} className="w-fit">
          <Button
            variant="default"
            size="default"
            className="h-auto gap-3 px-3 py-3 text-sm leading-[1.3] font-medium md:px-8 md:text-lg"
            icon={
              <ArrowRight
                className="size-[18px] shrink-0 md:size-5"
                strokeWidth={2}
              />
            }
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </article>
  );
}
