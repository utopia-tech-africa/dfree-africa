"use client";

import React from "react";
import Image from "next/image";

import { WorldMapMobileSvg, WorldMapSvg } from "@/assets/svg";
import ComponentLayout from "@/components/component-layout";
import { ContinentalImpactCard } from "./continental-impact-card";
import { Title } from "@/components/title-and-subtitle/title";
import { useTranslations } from "next-intl";

export const ContinentalImpact = () => {
  const t = useTranslations("africa.continentalImpact");
  const CONTINENTAL_IMPACT = {
    label: t("label"),
    title: t("title"),
    subtitle: t("subtitle"),
    countries: [
      {
        country: t("countries.ghana.name"),
        description: t("countries.ghana.description"),
        flag: "https://res.cloudinary.com/dan9camhs/image/upload/v1773145980/8c40374f-96b4-452c-801d-b20c258fa69f.webp",
        href: "/africa/continental/ghana",
      },
      {
        country: t("countries.southAfrica.name"),
        description: t("countries.southAfrica.description"),
        flag: "https://res.cloudinary.com/dan9camhs/image/upload/v1773146514/5c184ee3-66f3-4c20-8a5a-1e4f18f775f7.webp",
        href: "/africa/continental/south-africa",
      },
      {
        country: t("countries.uganda.name"),
        description: t("countries.uganda.description"),
        flag: "https://res.cloudinary.com/dan9camhs/image/upload/v1773146855/aff4a462-8fa5-4ef2-8a8b-bed650e90ca5.webp",
        href: "#",
      },
      {
        country: t("countries.liberia.name"),
        description: t("countries.liberia.description"),
        flag: "https://res.cloudinary.com/dan9camhs/image/upload/v1773146720/35ec826a-a1f8-4947-9476-76737c0cb988.webp",
        href: "#",
      },
    ],
  } as const;

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
