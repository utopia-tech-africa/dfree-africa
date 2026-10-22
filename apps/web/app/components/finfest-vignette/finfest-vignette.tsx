"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const VIGNETTE_DELAY_MS = 2000;
const VIGNETTE_SEEN_KEY = "dfree-finfest-vignette-seen";
const VIGNETTE_IMAGE =
  "https://res.cloudinary.com/dan9camhs/image/upload/v1792663495/Image12_t7feyd.png";

export function FinfestVignette() {
  const t = useTranslations("home.finfestVignette");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(VIGNETTE_SEEN_KEY)) return;

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(VIGNETTE_SEEN_KEY, "1");
      setOpen(true);
    }, VIGNETTE_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={t("imageAlt")}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-[440px]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute -top-3 -right-3 z-10 flex size-9 items-center justify-center rounded-full bg-white text-neutral-1000 shadow-md transition-colors hover:bg-neutral-100"
          aria-label={t("close")}
        >
          <X className="size-5" aria-hidden />
        </button>
        <Link href="/finfest" onClick={() => setOpen(false)} className="block">
          <Image
            src={VIGNETTE_IMAGE}
            alt={t("imageAlt")}
            width={880}
            height={1100}
            priority
            className="h-auto max-h-[85vh] w-full rounded-md object-contain shadow-2xl"
          />
        </Link>
      </div>
    </div>
  );
}
