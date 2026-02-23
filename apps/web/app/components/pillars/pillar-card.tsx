"use client";

import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  return (
    <div className="relative h-164 w-full overflow-hidden object-cover">
      <Image
        src={bgImage}
        alt={pillar}
        className="h-full w-full object-cover"
        priority
      />

      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/20" />

      {logo && (
        <div className="absolute left-6 top-6 z-20 bg-white">
          <Image
            src={logo}
            alt={`${pillar} logo`}
            className="h-12 w-auto md:h-14"
          />
        </div>
      )}

      <div className="absolute bottom-6 left-6 z-20 max-w-xl text-white md:bottom-10 md:left-10">
        <h3 className="mb-4 text-2xl font-semibold md:text-3xl">{pillar}</h3>

        <p className="mb-6 text-sm leading-relaxed text-white/90 md:text-base">
          {description}
        </p>

        <Link href={href}>
          <Button size="lg" className="rounded-full px-6">
            <span>Discover more →</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};
