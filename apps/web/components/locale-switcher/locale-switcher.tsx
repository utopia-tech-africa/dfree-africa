"use client";

import React, { useCallback, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type Locale = (typeof routing.locales)[number];

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  fr: "FR",
};

const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
};

const LOCALES = routing.locales as readonly Locale[];
const DISPLAY_LOCALES = ["en", "es", "fr"].filter((loc): loc is Locale =>
  LOCALES.includes(loc as Locale),
);
const PENDING_KEY = "locale-switcher-pending";

/** Pages with white/light backgrounds where desktop nav needs dark text. */
function isLightPage(pathname: string): boolean {
  return (
    pathname === "/finfest" ||
    pathname === "/africa/projects" ||
    pathname.startsWith("/africa/projects/")
  );
}

/** Strip locale prefix so router.replace gets a clean path.
 *  next-intl's usePathname() already returns a locale-free path,
 *  but guard against raw window.location usage or SSR edge cases. */
function pathWithoutLocale(pathname: string): string {
  const match = pathname.match(new RegExp(`^/(${LOCALES.join("|")})(/.+|$)`));
  if (match) {
    return match[2] || "/";
  }
  return pathname || "/";
}

type LocaleSwitcherProps = {
  variant?: "desktop" | "mobile";
  onSelect?: () => void;
};

export function LocaleSwitcher({
  variant = "desktop",
  onSelect,
}: LocaleSwitcherProps) {
  const currentLocale = (useLocale() ?? "en") as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const groupRef = useRef<HTMLDivElement>(null);

  // Optimistic locale: show clicked locale immediately and persist across remounts
  const [optimisticLocale, setOptimisticLocale] = React.useState<Locale | null>(
    () => {
      if (typeof window === "undefined") return null;
      const pending = sessionStorage.getItem(PENDING_KEY);
      return pending && LOCALES.includes(pending as Locale)
        ? (pending as Locale)
        : null;
    },
  );
  const locale = optimisticLocale ?? currentLocale;

  // On light pages (Finfest, Africa Projects), use black text at top, white when scrolled.
  const [isScrolled, setIsScrolled] = React.useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // When the real locale matches our optimistic value, commit and clear.
  useEffect(() => {
    if (!optimisticLocale) return;
    if (currentLocale === optimisticLocale) {
      setOptimisticLocale(null);
      sessionStorage.removeItem(PENDING_KEY);
    }
  }, [currentLocale, optimisticLocale]);

  const switchTo = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      setOptimisticLocale(newLocale);
      sessionStorage.setItem(PENDING_KEY, newLocale);
      const path = pathWithoutLocale(pathname);
      router.replace(path, { locale: newLocale, scroll: false });
      // Ensure server-fetched dynamic sections re-render for the new locale
      // immediately after locale navigation.
      router.refresh();
      onSelect?.();
    },
    [locale, pathname, router, onSelect],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = index > 0 ? index - 1 : DISPLAY_LOCALES.length - 1;
        (groupRef.current?.children[next] as HTMLElement)?.focus();
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = index < DISPLAY_LOCALES.length - 1 ? index + 1 : 0;
        (groupRef.current?.children[next] as HTMLElement)?.focus();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        const loc = DISPLAY_LOCALES[index];
        if (loc) switchTo(loc);
      }
    },
    [switchTo],
  );

  const isDesktop = variant === "desktop";
  const useLightTheme = !isDesktop || (isLightPage(pathname) && !isScrolled);

  return (
    <>
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label="Language"
        className="flex items-center gap-8"
      >
        {DISPLAY_LOCALES.map((loc, index) => {
          const isActive = loc === locale;
          return (
            <button
              key={loc}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`${LOCALE_NAMES[loc]}, ${isActive ? "current language" : "switch to " + LOCALE_NAMES[loc]}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => switchTo(loc)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "relative flex flex-col items-center font-montserrat font-bold text-base md:text-lg uppercase tracking-[0.16em] border-0 bg-transparent p-0 cursor-pointer outline-none transition-colors rounded-sm",
                "focus-visible:ring-2 focus-visible:ring-offset-2",
                "pb-px border-b-2 border-transparent rounded-none",
                useLightTheme
                  ? isActive
                    ? "text-neutral-1000 border-neutral-1000 focus-visible:ring-neutral-1000 focus-visible:ring-offset-white"
                    : "text-neutral-800 hover:text-neutral-1000 focus-visible:ring-neutral-1000 focus-visible:ring-offset-white"
                  : isActive
                    ? "text-white border-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] focus-visible:ring-white focus-visible:ring-offset-black"
                    : "text-neutral-200 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] focus-visible:ring-white focus-visible:ring-offset-black",
              )}
            >
              <span>{LOCALE_LABELS[loc]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
