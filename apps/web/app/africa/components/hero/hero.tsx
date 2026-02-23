import React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AfricaHeroImg, AfricaHeroMobileImg } from "@/assets";
import ComponentLayout from "@/components/component-layout";

const HERO_CONTENT = {
  title: "Empowering Africa",
  subtitle:
    "Driving financial freedom and sustainable community development through education, skills training and economic programs.",
  cta: {
    label: "Donate to the movement",
    href: "#",
  },
} as const;

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[600px] h-dvh flex flex-col items-center justify-end overflow-hidden">
      {/* Background image - mobile */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={AfricaHeroMobileImg}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Background image - desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={AfricaHeroImg}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#000000]/60" aria-hidden />

      {/* Content */}
      <ComponentLayout className="w-full z-10 flex flex-col items-center justify-center py-[94px] md:py-[156px]">
        <div className="text-center max-w-[343px] md:max-w-[708px]">
          <h1 className="font-montserrat w-full mb-3 text-[26px] font-bold leading-none tracking-tight text-neutral-100 md:text-[66px] lg:text-[70px] px-3">
            {HERO_CONTENT.title}
          </h1>
          <p className="mb-6 w-full md:mb-8 text-sm md:text-lg md:font-medium leading-[1.3] text-neutral-200">
            {HERO_CONTENT.subtitle}
          </p>

          <Link
            href={HERO_CONTENT.cta.href}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "text-base",
            )}
          >
            {HERO_CONTENT.cta.label}
          </Link>
        </div>
      </ComponentLayout>
    </section>
  );
};
