"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useInViewVideo } from "@/hooks/use-in-view-video";

export function HomeHeroVideo() {
  const t = useTranslations("home.hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const canPlay = useCallback(
    () => !prefersReducedMotion && !userPaused,
    [prefersReducedMotion, userPaused],
  );

  useInViewVideo(videoRef, {
    enabled: !prefersReducedMotion,
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

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      const reduced = motionQuery.matches;
      setPrefersReducedMotion(reduced);
      if (reduced && videoRef.current) {
        videoRef.current.pause();
        setUserPaused(true);
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
      setUserPaused(false);
    } else {
      video.pause();
      setUserPaused(true);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src="/vid/home-hero-vid.mp4"
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={t("videoLabel")}
      />
      <button
        type="button"
        onClick={togglePlayback}
        className="absolute right-4 top-24 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white"
        aria-pressed={userPaused}
        aria-label={isPlaying ? t("pauseVideo") : t("playVideo")}
      >
        {isPlaying ? (
          <Pause className="size-4" aria-hidden />
        ) : (
          <Play className="size-4" aria-hidden />
        )}
        <span>{isPlaying ? t("pauseVideo") : t("playVideo")}</span>
      </button>
    </>
  );
}
