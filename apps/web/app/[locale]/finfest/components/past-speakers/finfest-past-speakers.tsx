import React from "react";
import { getTranslations, getLocale } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Carousel } from "@/components/carousel";
import { SpeakerCard } from "./components/speaker-card";
import { getPastSpeakers } from "@/lib/sanity/past-speakers";

export const FinfestPastSpeakers = async () => {
  const t = await getTranslations("finfest.pastSpeakers");
  const locale = await getLocale();
  const speakers = await getPastSpeakers(locale);

  return (
    <section className="bg-white overflow-hidden">
      <ComponentLayout className="space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-2 ">
          <Title text={t("title")} />
          <Subtitle text={t("subtitle")} />
          <p className="text-base md:text-lg text-neutral-900 font-poppins opacity-80">
            {t("description")}
          </p>
        </div>

        {/* Carousel Slider with right bleed */}
        <Carousel slideClassName="w-[300px]">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker._id} speaker={speaker} />
          ))}
        </Carousel>
      </ComponentLayout>
    </section>
  );
};
