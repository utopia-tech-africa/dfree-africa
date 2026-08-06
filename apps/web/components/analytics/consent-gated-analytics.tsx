"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_EVENT,
  getCookieConsent,
  type CookieConsentValue,
} from "@/components/cookie-consent/cookie-consent";

const GA_MEASUREMENT_ID = "G-TLZZFHYGVW";
const HOTJAR_SCRIPT_URL = "https://t.contentsquare.net/uxa/4ba5b6ef3704f.js";

export function ConsentGatedAnalytics() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);

  useEffect(() => {
    setConsent(getCookieConsent());

    const handleChange = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsentValue>).detail;
      setConsent(detail ?? getCookieConsent());
    };

    window.addEventListener(CONSENT_EVENT, handleChange);
    return () => window.removeEventListener(CONSENT_EVENT, handleChange);
  }, []);

  if (consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-script" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
      <Script src={HOTJAR_SCRIPT_URL} strategy="afterInteractive" />
    </>
  );
}
