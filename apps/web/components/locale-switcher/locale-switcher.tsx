"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
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

function isLightPage(pathname: string): boolean {
  return (
    pathname === "/finfest" ||
    pathname === "/africa/projects" ||
    pathname.startsWith("/africa/projects/")
  );
}

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
  const listboxId = useId();
  const currentLocale = (useLocale() ?? "en") as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const listboxRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [optimisticLocale, setOptimisticLocale] = useState<Locale | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_KEY);
    if (pending && LOCALES.includes(pending as Locale)) {
      setOptimisticLocale(pending as Locale);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!optimisticLocale) return;
    if (currentLocale === optimisticLocale) {
      setOptimisticLocale(null);
      sessionStorage.removeItem(PENDING_KEY);
    }
  }, [currentLocale, optimisticLocale]);

  const locale = optimisticLocale ?? currentLocale;

  const switchTo = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      setOptimisticLocale(newLocale);
      sessionStorage.setItem(PENDING_KEY, newLocale);
      const path = pathWithoutLocale(pathname);
      router.replace(path, { locale: newLocale, scroll: false });
      router.refresh();
      onSelect?.();
    },
    [locale, pathname, router, onSelect],
  );

  const focusOption = useCallback((index: number) => {
    const option = optionRefs.current[index];
    option?.focus();
  }, []);

  const handleOptionKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = index > 0 ? index - 1 : DISPLAY_LOCALES.length - 1;
        focusOption(next);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = index < DISPLAY_LOCALES.length - 1 ? index + 1 : 0;
        focusOption(next);
      } else if (e.key === "Home") {
        e.preventDefault();
        focusOption(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusOption(DISPLAY_LOCALES.length - 1);
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        const loc = DISPLAY_LOCALES[index];
        if (loc) switchTo(loc);
      } else if (e.key === "Escape") {
        e.preventDefault();
        (e.currentTarget as HTMLElement).blur();
      }
    },
    [focusOption, switchTo],
  );

  const isDesktop = variant === "desktop";
  const useLightTheme = !isDesktop || (isLightPage(pathname) && !isScrolled);

  return (
    <div
      ref={listboxRef}
      id={listboxId}
      role="listbox"
      aria-label="Select language"
      aria-orientation="horizontal"
      className="flex items-center gap-8"
    >
      {DISPLAY_LOCALES.map((loc, index) => {
        const isSelected = loc === locale;
        const optionId = `${listboxId}-option-${loc}`;

        return (
          <button
            key={loc}
            id={optionId}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            type="button"
            role="option"
            aria-selected={isSelected}
            aria-label={
              isSelected ? `${LOCALE_NAMES[loc]}, selected` : LOCALE_NAMES[loc]
            }
            tabIndex={isSelected ? 0 : -1}
            onClick={() => switchTo(loc)}
            onKeyDown={(e) => handleOptionKeyDown(e, index)}
            className={cn(
              "relative flex flex-col items-center font-montserrat font-bold text-base md:text-lg uppercase tracking-[0.16em] border-0 bg-transparent p-0 cursor-pointer outline-none transition-colors rounded-sm",
              "focus-visible:ring-2 focus-visible:ring-offset-2",
              "pb-px border-b-2 border-transparent rounded-none",
              useLightTheme
                ? isSelected
                  ? "text-neutral-1000 border-neutral-1000 focus-visible:ring-neutral-1000 focus-visible:ring-offset-white"
                  : "text-neutral-800 hover:text-neutral-1000 focus-visible:ring-neutral-1000 focus-visible:ring-offset-white"
                : isSelected
                  ? "text-white border-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] focus-visible:ring-white focus-visible:ring-offset-black"
                  : "text-neutral-200 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] focus-visible:ring-white focus-visible:ring-offset-black",
            )}
          >
            <span aria-hidden="true">{LOCALE_LABELS[loc]}</span>
          </button>
        );
      })}
    </div>
  );
}
