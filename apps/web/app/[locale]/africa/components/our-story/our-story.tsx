"use client";

import React, { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { useTranslations } from "next-intl";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";

export const OurStory = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const t = useTranslations("africa.ourStory");

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <ComponentLayout>
      <section className="mt-8 md:mt-10 lg:mt-[66px] flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2 justify-center text-center">
          <Title text={t("title")} />
          <Subtitle text={t("subtitle")} />
          <p className="text-base md:text-lg lg:text-[22px] leading-[130%]">
            {t("description")}
          </p>
        </div>

        <div className="relative w-full h-100 md:h-125 lg:h-146.25">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-lg"
            src="/vid/our-story-vid.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
          />

          <div
            onClick={toggleMute}
            className="absolute top-4 right-4 p-2 bg-white rounded-full text-black shadow-md cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="stroke-neutral-1000 fill-neutral-1000 w-4 h-4" />
            ) : (
              <Volume2 className="stroke-neutral-1000 fill-neutral-1000 w-4 h-4" />
            )}
          </div>
        </div>
      </section>
    </ComponentLayout>
  );
};
