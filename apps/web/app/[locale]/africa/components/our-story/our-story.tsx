"use client";

import React, { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";

export const OurStory = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <ComponentLayout>
      <section className="mt-8 md:mt-10 lg:mt-[66px] flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 justify-center text-center">
          <Title text="our story" />
          <p className="font-montserrat text-base md:text-lg lg:text-[22px] font-bold leading-[120%]">
            Driven by a vision to empower the African diaspora, Dr. DeForest B.
            Soaries, Jr. founded Dfree Global Foundation, which birthed DFREE®
            Africa, to replace the cycle of poverty with a mindset of wealth and
            self-sufficiency. This mission is deeply rooted in Dr. Soaries’
            long-standing connection to the continent, beginning with his first
            visit to South Africa in 1990. He has since spent decades forging
            continental partnerships that champion economic, social, and
            spiritual growth, dedicating his leadership to building strategic
            connections across the continent, especially in Ghana, Liberia,
            Uganda, Botswana, South Africa and several other countries. His work
            focuses on integrating economic development with educational,
            spiritual and social progress to create sustainable, higher
            standards of living for all.
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
