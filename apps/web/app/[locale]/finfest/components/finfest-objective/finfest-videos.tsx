"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { useInViewVideo } from "@/hooks/use-in-view-video";
import { cn } from "@/lib/utils";

type FinfestVideoPlayerProps = {
  src: string;
  autoPlayDefault?: boolean;
};

const FinfestVideoPlayer = ({
  src,
  autoPlayDefault = false,
}: FinfestVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(!autoPlayDefault);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="w-full rounded-2xl overflow-hidden relative group bg-neutral-900">
      <video
        ref={videoRef}
        className="w-full block"
        src={src}
        loop
        // muted
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={togglePlayback}
          className={cn(
            "flex items-center justify-center rounded-full size-16 md:size-20",
            "bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
            isPlaying
              ? "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
              : "opacity-100 scale-100",
          )}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="size-8 md:size-10 fill-white stroke-none" />
          ) : (
            <Play className="size-8 md:size-10 fill-white stroke-none translate-x-[2px]" />
          )}
        </button>
      </div>
    </div>
  );
};

const FinfestVideos = () => {
  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-10 w-full">
      <FinfestVideoPlayer
        src="https://res.cloudinary.com/dan9camhs/video/upload/v1777898923/Video_-_FinFe_t_Prudential_Partner_Portia_bidjen.mp4"
        autoPlayDefault={true}
      />
      <FinfestVideoPlayer
        src="https://res.cloudinary.com/dan9camhs/video/upload/v1777899145/Video_RWJ_Barnabas_Health_k78x7e.mp4"
        autoPlayDefault={false}
      />
    </section>
  );
};

export default FinfestVideos;
