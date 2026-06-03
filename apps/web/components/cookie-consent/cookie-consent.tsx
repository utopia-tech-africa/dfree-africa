"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const CONSENT_KEY = "dfree-cookie-consent";
const CONSENT_EVENT = "dfree-cookie-consent-change";

export type CookieConsentValue = "accepted" | "rejected";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

export function setCookieConsent(value: CookieConsentValue) {
  localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent("dfree-open-cookie-settings"));
}

type CookieConsentProps = {
  onConsentChange?: (value: CookieConsentValue) => void;
};

export function CookieConsent({ onConsentChange }: CookieConsentProps) {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);

  const applyConsent = useCallback(
    (value: CookieConsentValue) => {
      setCookieConsent(value);
      onConsentChange?.(value);
      setVisible(false);
    },
    [onConsentChange],
  );

  useEffect(() => {
    if (!getCookieConsent()) setVisible(true);

    const openSettings = () => setVisible(true);
    window.addEventListener("dfree-open-cookie-settings", openSettings);
    return () =>
      window.removeEventListener("dfree-open-cookie-settings", openSettings);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className={cn(
        "fixed bottom-4 right-4 z-[100] w-[calc(100%-2rem)] max-w-md",
        "rounded-lg border border-neutral-200 bg-white p-4 shadow-lg",
      )}
    >
      <p
        id="cookie-consent-title"
        className="font-montserrat text-base font-bold text-neutral-900"
      >
        {t("title")}
      </p>
      <p
        id="cookie-consent-description"
        className="mt-2 text-sm leading-relaxed text-neutral-700"
      >
        {t("description")}{" "}
        <Link href="/privacy-policy" className="underline">
          {t("privacyLink")}
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button size="sm" onClick={() => applyConsent("accepted")}>
          {t("accept")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => applyConsent("rejected")}
        >
          {t("reject")}
        </Button>
      </div>
    </div>
  );
}

export { CONSENT_EVENT };
