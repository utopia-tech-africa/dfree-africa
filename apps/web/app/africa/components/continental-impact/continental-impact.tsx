import React from "react";
import Image from "next/image";
import {
  GhanaFlag,
  LiberianFlag,
  SouthAfricanFlag,
  UgandanFlag,
} from "@/assets/img";
import { WorldMapMobileSvg, WorldMapSvg } from "@/assets/svg";
import ComponentLayout from "@/components/component-layout";
import { ContinentalImpactCard } from "./continental-impact-card";
import { Title } from "@/components/title-and-subtitle/title";

const CONTINENTAL_IMPACT = {
  label: "Continental",
  title: "Continental Impact",
  subtitle: "Transforming financial landscapes across African communities",
  countries: [
    {
      country: "Ghana",
      description:
        "Empowering communities with financial education and community development projects.",
      flag: GhanaFlag,
      href: "#",
    },
    {
      country: "South Africa",
      description:
        "Promoting financial freedom in partnership with the Baptist Convention of South Africa.",
      flag: SouthAfricanFlag,
      href: "#",
    },
    {
      country: "Uganda",
      description:
        "Creating opportunities to improve standards of living through economic development programs",
      flag: UgandanFlag,
      href: "#",
    },
    {
      country: "Liberia",
      description:
        "Enhancing global access and educational opportunities with the leadership of the Baptist Convention",
      flag: LiberianFlag,
      href: "#",
    },
  ],
} as const;

export const ContinentalImpact = () => {
  return (
    <section className="relative overflow-hidden  mt-6 md:mt-10 lg:mt-30 pt-16 md:pt-21">
      {/* World map pattern - mobile */}
      <div className="absolute left-1/2 -top-48 h-[525.8px] w-screen -translate-x-1/2 md:hidden">
        <Image
          src={WorldMapMobileSvg}
          alt=""
          fill
          className="object-contain"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0" aria-hidden />
      </div>

      {/* World map pattern - desktop */}
      <div className="absolute left-1/2 -top-44 hidden h-[525.8px] w-screen -translate-x-1/2 md:block lg:-top-24 lg:w-[87%]">
        <Image
          src={WorldMapSvg}
          alt=""
          fill
          className="object-contain "
          sizes="(min-width: 1024px) 70vw"
          aria-hidden
        />
        <div className="absolute inset-0" aria-hidden />
      </div>

      <ComponentLayout className="relative z-10">
        {/* Header */}
        <div className="mb-6 lg:mb-12 text-center md:mb-8">
          <Title text={CONTINENTAL_IMPACT.label} />

          <h2 className="font-montserrat mb-2 md:mb-4 text-[22px] font-bold leading-tight text-neutral-1000 md:text-[32px]">
            {CONTINENTAL_IMPACT.title}
          </h2>
          <p className="mx-auto max-w-2xl font-poppins text-sm lg:text-lg font-medium leading-[1.3] text-neutral-900">
            {CONTINENTAL_IMPACT.subtitle}
          </p>
        </div>

        {/* Country cards */}
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {CONTINENTAL_IMPACT.countries.map((country) => (
            <ContinentalImpactCard
              key={country.country}
              country={country.country}
              description={country.description}
              flag={country.flag}
              href={country.href}
            />
          ))}
        </div>
      </ComponentLayout>
    </section>
  );
};
