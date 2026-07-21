"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const benefitKeys = [
  "scholarship",
  "training",
  "deployment",
  "alumni",
  "capstone",
] as const;

const beforeYouBeginKeys = ["duration", "saveContinue", "noFee"] as const;

type ApplicationStartModalProps = {
  onStart: () => void;
  onClose: () => void;
};

export function ApplicationStartModal({
  onStart,
  onClose,
}: ApplicationStartModalProps) {
  const t = useTranslations("leadershipInstituteApplication.startModal");

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
      aria-labelledby="application-start-modal-title"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-[833px] flex-col overflow-hidden rounded-[20px] border border-secondary-300/20 bg-white shadow-xl">
        <div className="relative z-10 flex shrink-0 items-center justify-center rounded-t-[20px] bg-primary-500 px-4 py-4 shadow-[0px_4px_21px_3px_rgba(0,0,0,0.25)] sm:px-6 sm:py-5">
          <h2
            id="application-start-modal-title"
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

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6 sm:px-4 sm:py-6">
          <div className="space-y-2 text-center">
            <p className="font-montserrat text-lg font-bold leading-[1.2] text-neutral-800 sm:text-[22px]">
              {t("headline")}
            </p>
            <p className="mx-auto max-w-[48rem] font-poppins text-base leading-[1.2] text-neutral-800 sm:text-lg sm:leading-[1.3]">
              {t("body")}
            </p>
          </div>

          <div className="space-y-3 rounded-lg bg-primary-500 p-4 sm:p-6">
            <p className="font-montserrat text-lg font-bold leading-[1.2] text-white sm:text-[22px]">
              {t("benefitsTitle")}
            </p>
            <ul className="space-y-3">
              {benefitKeys.map((key) => (
                <li key={key} className="flex items-center gap-3">
                  <span
                    className="flex size-3 shrink-0 items-center justify-center rounded-full bg-white"
                    aria-hidden
                  >
                    <span className="size-1.5 rounded-full bg-primary-500" />
                  </span>
                  <span className="font-poppins text-base leading-[1.2] text-neutral-200">
                    {t(`benefits.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <p className="font-montserrat text-lg font-bold leading-[1.2] text-neutral-900">
              {t("beforeYouBeginTitle")}
            </p>
            <ul className="space-y-2">
              {beforeYouBeginKeys.map((key) => (
                <li
                  key={key}
                  className="font-poppins text-base leading-[1.2] text-neutral-800"
                >
                  {t(`beforeYouBegin.${key}`)}
                </li>
              ))}
            </ul>
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
