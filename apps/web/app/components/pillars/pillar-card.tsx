"use client";

import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import gsap from "gsap";

type PillarCardProps = {
  pillar: string;
  description: string;
  bgImage: StaticImageData;
  logo?: StaticImageData;
  href: string;
};

export const PillarCard = ({
  pillar,
  description,
  logo,
  bgImage,
  href,
}: PillarCardProps) => {
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (): void => {
    if (!imageWrapperRef.current) return;

    gsap.to(imageWrapperRef.current, {
      scale: 1.05,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (): void => {
    if (!imageWrapperRef.current) return;

    gsap.to(imageWrapperRef.current, {
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <div
      className="relativew-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={imageWrapperRef}
        className="absolute  h-125  inset-0 will-change-transform"
      >
        <Image
          src={bgImage}
          alt={pillar}
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 67.14%)",
        }}
      />

      {/* Logo */}
      {logo && (
        <div className="absolute left-6 top-6 z-20 bg-white p-2">
          <Image
            src={logo}
            alt={`${pillar} logo`}
            className="h-12 w-auto md:h-14"
          />
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-10 left-10 z-20 max-w-xl text-white">
        <h3 className="mb-4 text-2xl font-semibold md:text-3xl">{pillar}</h3>

        <p className="mb-6 text-sm leading-relaxed text-white/90 md:text-base">
          {description}
        </p>

        <Link href={href}>
          <Button size="lg" className="px-6 shadow-lg">
            Discover more →
          </Button>
        </Link>
      </div>
    </div>
  );
};
