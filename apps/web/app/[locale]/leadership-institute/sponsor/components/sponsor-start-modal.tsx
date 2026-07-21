"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const impactKeys = ["one", "fiveTen", "dozens"] as const;

type SponsorStartModalProps = {
  onStart: () => void;
  onClose: () => void;
};

export function SponsorStartModal({
  onStart,
  onClose,
}: SponsorStartModalProps) {
  const t = useTranslations("leadershipInstituteSponsor.startModal");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sponsor-start-modal-title"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-[833px] flex-col overflow-hidden rounded-[20px] border border-secondary-300/20 bg-white shadow-xl">
        <div className="relative z-10 flex shrink-0 items-center justify-center rounded-t-[20px] bg-primary-500 px-4 py-4 shadow-[0px_4px_21px_3px_rgba(0,0,0,0.25)] sm:px-6 sm:py-5">
          <h2
            id="sponsor-start-modal-title"
            className="px-8 text-center font-montserrat text-lg font-bold leading-snug text-white sm:px-10 sm:text-xl md:text-[32px] md:leading-[1.2]"
          >
            {t("title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition-opacity hover:opacity-80 sm:right-6"
          >
            <X className="size-6" aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            <p className="font-montserrat text-lg font-bold leading-[1.2] text-neutral-800 sm:text-[22px]">
              {t("headline")}
            </p>
            <p className="font-poppins text-base leading-[1.2] text-neutral-800 sm:text-lg sm:leading-[1.3]">
              {t("body")}
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-montserrat text-xl font-bold leading-[1.2] text-neutral-800">
              {t("impactTitle")}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {impactKeys.map((key) => (
                <div
                  key={key}
                  className="relative flex flex-col gap-6 overflow-hidden rounded-lg bg-primary-500 px-3 py-6"
                >
                  <span
                    className="pointer-events-none absolute -left-16 -top-12 size-56 rounded-full bg-primary-400/30"
                    aria-hidden
                  />
                  <p className="relative font-montserrat text-[22px] font-bold leading-[1.2] text-white">
                    {t(`impact.${key}.stat`)}
                  </p>
                  <p className="relative font-montserrat text-[15px] font-bold leading-[1.2] text-white">
                    {t(`impact.${key}.label`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="w-full rounded-full bg-primary-500 px-6 py-5 font-montserrat text-lg font-bold leading-[1.2] text-white shadow-[0px_8px_10px_-6px_rgba(51,94,0,0.1),0px_20px_25px_-5px_rgba(51,94,0,0.1)] transition-opacity hover:opacity-90"
          >
            {t("start")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
