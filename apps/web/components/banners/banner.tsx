"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";

interface BannerProps {
  backgroundImage: string | StaticImageData;
  title: string;
  description: string;
  className?: string;
  button: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export const Banner: React.FC<BannerProps> = ({
  backgroundImage,
  title,
  description,
  button,
  className,
}) => {
  return (
    <div className={cn("mb-3 lg:px-20 max-w-360 mx-auto", className)}>
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

            {/* Button */}
            <div className="mt-3">
              {button.href ? (
                <Link href={button.href}>
                  <Button>{button.label}</Button>
                </Link>
              ) : (
                <Button onClick={button.onClick}>{button.label}</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
