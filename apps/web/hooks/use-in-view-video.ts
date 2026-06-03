"use client";

import { useEffect, useRef, type RefObject } from "react";

type UseInViewVideoOptions = {
  /** Fraction of the video that must be visible before playing (0–1). */
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
  /** Horizontal scroll container (e.g. testimonial carousel). */
  rootRef?: RefObject<Element | null>;
  /** When false, the video stays paused even while in view (e.g. user paused). */
  canPlay?: () => boolean;
};

export function useInViewVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  {
    threshold,
    rootMargin,
    enabled = true,
    rootRef,
    canPlay,
  }: UseInViewVideoOptions = {},
) {
  const canPlayRef = useRef(canPlay);
  canPlayRef.current = canPlay;

  const pageThreshold = 0.15;
  const rootThreshold = threshold ?? (rootRef ? 0.55 : 0.25);

  useEffect(() => {
    if (!enabled) return;

    const video = videoRef.current;
    if (!video) return;

    let pageVisible = false;
    let rootVisible = !rootRef;

    const syncPlayback = () => {
      const mayPlay =
        pageVisible &&
        rootVisible &&
        (!canPlayRef.current || canPlayRef.current());

      if (mayPlay) {
        void video.play().catch(() => {
          // Ignored: autoplay blocked or media not ready
        });
      } else {
        video.pause();
      }
    };

    const pageObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        pageVisible = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: pageThreshold, rootMargin },
    );

    pageObserver.observe(video);

    let rootObserver: IntersectionObserver | null = null;
    const scrollRoot = rootRef?.current;
    if (scrollRoot) {
      rootObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          rootVisible = entry.isIntersecting;
          syncPlayback();
        },
        { threshold: rootThreshold, root: scrollRoot },
      );
      rootObserver.observe(video);
    }

    return () => {
      pageObserver.disconnect();
      rootObserver?.disconnect();
    };
  }, [videoRef, enabled, pageThreshold, rootThreshold, rootMargin, rootRef]);
}
