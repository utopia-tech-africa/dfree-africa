"use client";
import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface BannerProps {
  backgroundImage: string | StaticImageData;
  title: string;
  description: string;
  label: string;
  className?: string;
  href: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export const Banner: React.FC<BannerProps> = ({
  backgroundImage,
  title,
  description,
  label,
  href,
  className,
  secondaryLabel,
  secondaryHref,
}) => {
  return (
    <div className={cn("mb-3 lg:px-20 mx-auto", className)}>
      <div className="relative w-full min-h-101 border flex items-end md:items-center  md:rounded-lg overflow-hidden">
        {/* Background */}
        <Image
          src={backgroundImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-end sm:items-center justify-center sm:justify-start p-6 sm:px-12">
          <div className="w-full sm:w-1/2 sm:h-full text-white text-left flex flex-col gap-2 sm:gap-4">
            {/* Title */}
            <h1 className="font-bold font-montserrat text-[22px] sm:text-[46px] leading-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-[14px] sm:text-[18px] text-white/90 leading-5  sm:leading-6 sm:font-medium tracking-wide">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={href}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "w-fit",
                )}
              >
                {label}
              </Link>

              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "w-fit border border-white/30",
                  )}
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
