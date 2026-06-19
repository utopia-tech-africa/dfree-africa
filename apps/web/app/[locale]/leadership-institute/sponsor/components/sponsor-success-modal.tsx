"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { useRouter } from "@/i18n/navigation";

type SponsorSuccessModalProps = {
  onGoHome?: () => void;
};

export function SponsorSuccessModal({ onGoHome }: SponsorSuccessModalProps) {
  const t = useTranslations("leadershipInstituteSponsor.success");
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMounted]);

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
      return;
    }

    router.push("/leadership-institute");
  };

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sponsor-success-title"
    >
      <div className="flex max-h-[90vh] w-full max-w-[833px] flex-col items-center gap-5 overflow-y-auto rounded-[20px] border border-secondary-300/20 bg-white px-4 pb-5 pt-10 shadow-xl sm:gap-8 sm:pb-6 sm:pt-16 md:gap-[33px] md:px-8 md:pb-6 md:pt-20">
        <div className="flex w-full max-w-[801px] flex-col gap-2 text-center sm:gap-3">
          <h2
            id="sponsor-success-title"
            className="font-montserrat text-xl font-bold leading-snug text-neutral-1000 sm:text-2xl sm:leading-[1.2] md:text-[32px]"
          >
            {t("title")}
          </h2>
          <p className="font-poppins text-sm leading-relaxed text-neutral-700 sm:text-base sm:leading-[1.3] md:text-lg">
            {t("body")}
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoHome}
          className="flex h-12 w-full max-w-[801px] items-center justify-center rounded-full bg-primary-500 font-montserrat text-base font-bold leading-[1.2] text-white shadow-lg shadow-primary-600/10 transition-opacity hover:opacity-95 sm:h-[62px] sm:text-lg"
        >
          {t("goBack")}
        </button>
      </div>
    </div>,
    document.body,
  );
}
