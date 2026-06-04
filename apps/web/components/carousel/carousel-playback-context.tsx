"use client";

import { createContext, useContext, type RefObject } from "react";

export const CarouselPlaybackRootContext =
  createContext<RefObject<HTMLElement | null> | null>(null);

export function useCarouselPlaybackRoot() {
  return useContext(CarouselPlaybackRootContext);
}
