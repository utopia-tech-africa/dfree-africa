"use client";

import { useRef, type ComponentProps } from "react";
import { useInViewVideo } from "@/hooks/use-in-view-video";

type InViewVideoProps = ComponentProps<"video"> & {
  threshold?: number;
  playbackEnabled?: boolean;
};

/** Muted background-style video that plays only while visible in the viewport. */
export function InViewVideo({
  threshold,
  playbackEnabled = true,
  autoPlay: _autoPlay,
  ...props
}: InViewVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useInViewVideo(videoRef, { threshold, enabled: playbackEnabled });

  return <video ref={videoRef} playsInline {...props} />;
}
