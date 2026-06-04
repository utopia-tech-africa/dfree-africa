"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  CONSENT_EVENT,
  getCookieConsent,
} from "@/components/cookie-consent/cookie-consent";

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
    const trackPageview = () => {
      if (getCookieConsent() !== "accepted") return;
      if (!pathname || typeof window === "undefined" || !window.gtag) return;
      const query = searchParams.toString();
      const pagePath = query ? `${pathname}?${query}` : pathname;

      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pagePath,
      });
    };

    trackPageview();
    window.addEventListener(CONSENT_EVENT, trackPageview);
    return () => window.removeEventListener(CONSENT_EVENT, trackPageview);
  }, [pathname, searchParams]);

  return null;
}
