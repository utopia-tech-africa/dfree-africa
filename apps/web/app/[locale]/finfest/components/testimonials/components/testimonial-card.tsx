"use client";

import React, { useRef, useState } from "react";
import {
  PiQuotes,
  PiQuotesDuotone,
  PiSpeakerSimpleHighBold,
  PiSpeakerSimpleSlashBold,
} from "react-icons/pi";

export type Testimonial = {
  type: "video" | "text";
  name: string;
  organization?: string;
  content?: string;
  thumbnail?: string;
};

export const TestimonialCard = ({
  testimonial,
}: {
  testimonial: Testimonial;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  if (testimonial.type === "video") {
    return (
      <div className="relative w-full h-[420px] max-w-[300px] bg-neutral-900 rounded-[8px] overflow-hidden group">
        {/* Video Element */}
        <video
          ref={videoRef}
          src={testimonial.thumbnail}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Volume Toggle */}
        <button
          onClick={toggleMute}
          className="absolute top-3 right-3 z-20 size-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors cursor-pointer"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <PiSpeakerSimpleSlashBold className="size-5" />
          ) : (
            <PiSpeakerSimpleHighBold className="size-5" />
          )}
        </button>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Name */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <h4 className="text-lg font-bold text-white font-montserrat">
            {testimonial.name}
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary-500 w-full h-[420px] max-w-[300px] p-[12px] rounded-[8px] flex flex-col justify-between text-white relative">
      <div className="space-y-3">
        <PiQuotesDuotone className="size-8 text-white rotate-180" />
        <p className="font-poppins leading-relaxed opacity-90">
          {testimonial.content}
        </p>
      </div>

      <div className="space-y-0.5 pt-4">
        <h4 className="text-lg font-bold font-montserrat ">
          {testimonial.name}
        </h4>
        {testimonial.organization && (
          <p className="text-sm font-poppins opacity-70 tracking-wide">
            {testimonial.organization}
          </p>
        )}
      </div>
    </div>
  );
};
