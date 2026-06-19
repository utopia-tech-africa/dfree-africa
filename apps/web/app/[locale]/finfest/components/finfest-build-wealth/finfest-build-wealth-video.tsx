"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useInViewVideo } from "@/hooks/use-in-view-video";
import { cn } from "@/lib/utils";

const BUILD_WEALTH_VIDEO_SRC =
  "https://res.cloudinary.com/dan9camhs/video/upload/v1781869329/FinFet_A_Life-Changing_Day_of_Financial_Freedom_and_Wellness_-_dfreemovement_1080p_h264_ekrqu7.mp4";

export function FinfestBuildWealthVideo() {
  const t = useTranslations("home.testimonials");
  const tHero = useTranslations("home.hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const canPlay = useCallback(() => !userPaused, [userPaused]);

  useInViewVideo(videoRef, {
    enabled: true,
    canPlay,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => {});
      setUserPaused(false);
    } else {
      video.pause();
      setUserPaused(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="group relative flex aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 md:aspect-2.5/1">
      <video
        ref={videoRef}
        src={BUILD_WEALTH_VIDEO_SRC}
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
      />

      <button
        type="button"
        onClick={toggleMute}
        className="absolute right-3 top-3 z-20 flex size-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40"
        aria-label={isMuted ? t("unmuteVideo") : t("muteVideo")}
      >
        {isMuted ? (
          <VolumeX size={18} aria-hidden />
        ) : (
          <Volume2 size={18} aria-hidden />
        )}
      </button>

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={togglePlayback}
          className={cn(
            "flex size-16 items-center justify-center rounded-full md:size-20",
            "border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300",
            "hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            isPlaying
              ? "scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100"
              : "scale-100 opacity-100",
          )}
          aria-label={isPlaying ? tHero("pauseVideo") : tHero("playVideo")}
        >
          {isPlaying ? (
            <Pause className="size-8 fill-white stroke-none md:size-10" />
          ) : (
            <Play className="size-8 translate-x-[2px] fill-white stroke-none md:size-10" />
          )}
        </button>
      </div>
    </div>
  );
}
