"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_MEASUREMENT_ID = "G-TLZZFHYGVW";

type GtagFn = (
  command: "config",
  targetId: string,
  config?: { page_path?: string },
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export function GoogleAnalyticsPageviews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || typeof window === "undefined" || !window.gtag) return;
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: pagePath,
    });
  }, [pathname, searchParams]);

  return null;
}
