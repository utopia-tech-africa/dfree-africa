"use client";

import { openCookieSettings } from "@/components/cookie-consent/cookie-consent";

type FooterCookieSettingsProps = {
  label: string;
};

export function FooterCookieSettings({ label }: FooterCookieSettingsProps) {
  return (
    <button
      type="button"
      className="underline"
      onClick={() => openCookieSettings()}
    >
      {label}
    </button>
  );
}
