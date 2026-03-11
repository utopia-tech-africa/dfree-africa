"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import ComponentLayout from "@/components/component-layout";
import Image from "next/image";
import {
  CampaignsWhatWeDoImg1,
  CampaignsWhatWeDoImg2,
  CampaignsWhatWeDoImg3,
} from "@/assets";

const WHAT_WE_DO_ITEM_KEYS = [
  "unifiedCollaboration",
  "sharedAccountability",
  "measurableImpact",
] as const;

const WHAT_WE_DO_IMAGES = [
  CampaignsWhatWeDoImg1,
  CampaignsWhatWeDoImg2,
  CampaignsWhatWeDoImg3,
] as const;

export const CampaignsWhatWeDo = () => {
  const t = useTranslations("communityCampaigns.whatWeDo");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === WHAT_WE_DO_ITEM_KEYS.length - 1 ? 0 : prev + 1,
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col lg:grid lg:grid-cols-2">
      <ComponentLayout className="py-2 bg-primary-500 lg:h-full">
        <h4 className="font-montserrat font-bold text-base md:text-lg lg:text-2xl text-neutral-100">
          {t("title")}
        </h4>

        <div className="flex flex-col py-6 gap-6">
          {WHAT_WE_DO_ITEM_KEYS.map((key, index) => {
            const isActive = index === activeIndex;

            return (
              <div key={key}>
                <h3
                  className={`font-montserrat font-bold text-lg md:text-2xl lg:text-[30px] transition-colors duration-500 ${
                    isActive ? "text-neutral-100" : "text-neutral-400"
                  }`}
                >
                  {t(`items.${key}.title`)}
                </h3>

                <p
                  className={`font-poppins text-sm md:text-base mt-2 transition-colors duration-500 ${
                    isActive ? "text-neutral-100" : "text-neutral-400"
                  }`}
                >
                  {t(`items.${key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </ComponentLayout>

      <div className="relative w-full h-75 sm:h-100 lg:h-auto lg:min-h-full overflow-hidden">
        {WHAT_WE_DO_ITEM_KEYS.map((key, index) => (
          <Image
            key={key}
            src={WHAT_WE_DO_IMAGES[index]!}
            alt={t(`items.${key}.title`)}
            fill
            priority={index === 0}
            className={`object-cover absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
