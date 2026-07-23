import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExternalUrl(href: string): boolean {
  const trimmed = href.trim();

  if (!trimmed || trimmed.startsWith("/") || trimmed.startsWith("#")) {
    return false;
  }

  return (
    /^https?:\/\//i.test(trimmed) ||
    /^\/\//.test(trimmed) ||
    /^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)
  );
}

export function getExternalUrl(href: string): string {
  const trimmed = href.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  return `https://${trimmed.replace(/^\/+/, "")}`;
}

export function formatDateWithOrdinal(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();

  const ordinal = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${month} ${day}${ordinal(day)} ${year}`;
}
