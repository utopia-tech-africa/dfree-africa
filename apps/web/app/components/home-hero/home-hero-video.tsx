"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";

export function HomeHeroVideo() {
  const t = useTranslations("home.hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      const reduced = motionQuery.matches;
      setPrefersReducedMotion(reduced);
      if (reduced && videoRef.current) {
        videoRef.current.pause();
        setIsPaused(true);
      }
    };

    syncMotion();
    motionQuery.addEventListener("change", syncMotion);
    return () => motionQuery.removeEventListener("change", syncMotion);
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/vid/home-hero-vid.mp4"
        autoPlay={!prefersReducedMotion}
        muted
        loop
        playsInline
        aria-label={t("videoLabel")}
      />
      <button
        type="button"
        onClick={togglePlayback}
        className="absolute right-4 top-24 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white"
        aria-pressed={isPaused}
        aria-label={isPaused ? t("playVideo") : t("pauseVideo")}
      >
        {isPaused ? (
          <Play className="size-4" aria-hidden />
        ) : (
          <Pause className="size-4" aria-hidden />
        )}
        <span>{isPaused ? t("playVideo") : t("pauseVideo")}</span>
      </button>
    </>
  );
}
