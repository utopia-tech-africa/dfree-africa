"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { useInViewVideo } from "@/hooks/use-in-view-video";

const HERO_POSTER = "/vid/home-hero-poster.jpg";

const HERO_SOURCES = {
  desktop: {
    webm: "/vid/home-hero-vid.webm",
    mp4: "/vid/home-hero-vid.mp4",
  },
  mobile: {
    webm: "/vid/home-hero-vid-mobile.webm",
    mp4: "/vid/home-hero-vid-mobile.mp4",
  },
} as const;

export function HomeHeroVideo() {
  const t = useTranslations("home.hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const canPlay = useCallback(
    () => !prefersReducedMotion && !userPaused,
    [prefersReducedMotion, userPaused],
  );

  useInViewVideo(videoRef, {
    enabled: !prefersReducedMotion && !isMobile,
    canPlay,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const syncMobile = () => setIsMobile(mobileQuery.matches);
    syncMobile();
    mobileQuery.addEventListener("change", syncMobile);
    return () => mobileQuery.removeEventListener("change", syncMobile);
  }, []);

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
  }, [isMobile]);

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

  const showPosterOnly = prefersReducedMotion || isMobile;

  if (showPosterOnly) {
    return (
      <Image
        src={HERO_POSTER}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
        aria-hidden
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={HERO_POSTER}
        aria-label={t("videoLabel")}
      >
        <source src={HERO_SOURCES.desktop.webm} type="video/webm" />
        <source src={HERO_SOURCES.desktop.mp4} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={togglePlayback}
        className="absolute right-4 top-24 z-20 flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-sm font-medium text-white opacity-0 backdrop-blur-sm focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-white"
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
