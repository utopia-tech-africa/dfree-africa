import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type ContinentalImpactCardProps = {
  country: string;
  description: string;
  flag: StaticImageData | string;
  href: string;
};

export const ContinentalImpactCard = ({
  country,
  description,
  flag,
  href,
}: ContinentalImpactCardProps) => {
  return (
    <article
      className="group relative w-full min-w-0 aspect-3/4 rounded-sm md:rounded-lg p-px md:aspect-auto md:h-[415px]"
      style={{
        background:
          "linear-gradient(180deg, transparent 25.51%, var(--color-neutral-1000) 100%)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-sm md:rounded-lg">
        <Image
          src={flag}
          alt={`${country} flag`}
          fill
          className="object-cover grayscale-0 transition-all duration-300 group-hover:scale-120 lg:grayscale lg:group-hover:grayscale-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div
          className="absolute inset-0 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 34.44%, var(--color-neutral-1000) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end gap-y-6 p-6">
          <div>
            <h3 className="font-montserrat mb-2 leading-[1.2] text-2xl font-bold text-neutral-100 md:text-[28px]">
              {country}
            </h3>
            <p className="font-poppins text-sm font-normal leading-[1.2] text-neutral-100">
              {description}
            </p>
          </div>
          <Link
            href={href}
            className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
          >
            Learn more
          </Link>
        </div>
      </div>
    </article>
  );
};
