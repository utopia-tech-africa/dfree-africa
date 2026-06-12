"use client";

import Image from "next/image";
import { useRef, useState, type RefObject } from "react";
import { useInViewVideo } from "@/hooks/use-in-view-video";
import { Volume2, VolumeX } from "lucide-react";
import type { TestimonialForUI } from "@/lib/sanity/testimonials";

type Props = {
  testimonial: TestimonialForUI;
  playbackRootRef?: RefObject<HTMLElement | null>;
  muteVideoLabel: string;
  unmuteVideoLabel: string;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return name.trim().slice(0, 2).toUpperCase();
}

const avatarRingClassName =
  "relative flex w-14 h-14 sm:w-16 sm:h-16 shrink-0 items-center justify-center rounded-full p-1 overflow-hidden";

const TestimonialCard = ({
  testimonial,
  playbackRootRef,
  muteVideoLabel,
  unmuteVideoLabel,
}: Props) => {
  const isVideo = testimonial.mediaType === "video";

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  useInViewVideo(videoRef, { rootRef: playbackRootRef });

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  if (isVideo) {
    return (
      <div
        className="bg-white p-4 sm:p-6 flex flex-col items-center text-center 
        min-w-[85%] sm:min-w-[60%] md:min-w-100 lg:min-w-112.5"
      >
        <div className="w-full aspect-video mb-4 relative">
          <video
            ref={videoRef}
            src={testimonial.videoUrl}
            className="w-full h-full rounded-lg object-cover"
            playsInline
            muted
            loop
            preload="metadata"
          />

          <div className="absolute inset-0 rounded-lg pointer-events-none bg-[linear-gradient(180deg,rgba(102,102,102,0)_64.65%,rgba(0,0,0,0.52)_85.58%)]" />

          <div className="absolute bottom-2 left-3 text-white text-lg md:text-[20px] font-extrabold z-10">
            {testimonial.name}
          </div>

          <button
            type="button"
            onClick={toggleMute}
            className="absolute top-2 right-2 bg-[#AFAFAF40] text-white p-2 rounded-full"
            aria-label={muted ? unmuteVideoLabel : muteVideoLabel}
          >
            {muted ? (
              <VolumeX size={18} aria-hidden />
            ) : (
              <Volume2 size={18} aria-hidden />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white p-6 sm:p-8 flex flex-col items-center justify-between gap-y-6 text-center 
      min-w-[85%] sm:min-w-[60%] md:min-w-100 lg:min-w-112.5"
    >
      {testimonial.quote && (
        <p className="text-neutral-900 text-base md:text-lg font-bold leading-[140%]">
          {testimonial.quote}
        </p>
      )}

      <div className="flex items-center gap-4 md:mt-auto">
        <div
          className={avatarRingClassName}
          style={{
            background: "linear-gradient(to bottom, #7CDB17, #42750C)",
          }}
        >
          {testimonial.profilePhotoUrl ? (
            <Image
              src={testimonial.profilePhotoUrl}
              alt={testimonial.profilePhotoAlt ?? testimonial.name}
              width={58}
              height={58}
              className="object-cover w-full h-full rounded-full"
              sizes="64px"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center rounded-full bg-neutral-100 text-sm sm:text-base font-semibold text-primary-400"
              aria-hidden
            >
              {getInitials(testimonial.name)}
            </div>
          )}
        </div>

        <div className="flex flex-col items-start">
          <span className="text-neutral-900 font-semibold text-sm sm:text-base">
            {testimonial.name}
          </span>
          {testimonial.role && (
            <span className="text-neutral-600 text-xs sm:text-sm">
              {testimonial.role}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
