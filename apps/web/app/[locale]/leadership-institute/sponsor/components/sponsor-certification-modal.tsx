"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Controller, useFormContext } from "react-hook-form";

import { FormSelectField } from "@/components/forms/form-select-field";
import {
  sponsorReferralSourceValues,
  type LeadershipInstituteSponsorValues,
} from "@/lib/forms/schemas/leadership-institute-sponsor";

import {
  sponsorFieldLabelClassName,
  sponsorPillSelectTriggerClassName,
} from "./sponsor-form-field-styles";

type SponsorCertificationModalProps = {
  isSubmitting: boolean;
  submitError?: string | null;
  onClose: () => void;
  onSubmit: () => void;
};

export function SponsorCertificationModal({
  isSubmitting,
  submitError,
  onClose,
  onSubmit,
}: SponsorCertificationModalProps) {
  const t = useTranslations("leadershipInstituteSponsor.certificationModal");
  const {
    control,
    formState: { errors },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSubmitting, onClose]);

  const referralOptions = sponsorReferralSourceValues.map((value) => ({
    value,
    label: t(`options.referralSource.${value}`),
  }));

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sponsor-certification-modal-title"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-[833px] flex-col overflow-hidden rounded-[20px] border border-secondary-300/20 bg-white shadow-xl">
        <div className="relative z-10 flex shrink-0 items-center justify-center rounded-t-[20px] bg-primary-500 px-4 py-4 shadow-[0px_4px_21px_3px_rgba(0,0,0,0.25)] sm:px-6 sm:py-5">
          <h2
            id="sponsor-certification-modal-title"
            className="px-8 text-center font-montserrat text-lg font-bold leading-snug text-white sm:px-10 sm:text-xl md:text-[32px] md:leading-[1.2]"
          >
            {t("title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label={t("close")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white transition-opacity hover:opacity-80 disabled:opacity-50 sm:right-6"
          >
            <X className="size-5 sm:size-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-5 pt-5 sm:px-4 sm:pb-6 sm:pt-8">
          <div className="mx-auto flex w-full max-w-[801px] flex-col gap-5 sm:gap-8 md:gap-[33px]">
            <section className="rounded-lg bg-primary-500 p-4 text-white sm:p-6">
              <h3 className="font-montserrat text-base font-bold leading-snug sm:text-[22px] sm:leading-[1.2]">
                {t("authorization.title")}
              </h3>
              <p className="mt-3 font-poppins text-sm leading-[1.2] text-neutral-200 sm:text-base">
                {t("authorization.body")}
              </p>
            </section>

            <Controller
              name="referralSource"
              control={control}
              render={({ field }) => (
                <FormSelectField
                  id="sponsor-referral-source"
                  label={t("fields.referralSource")}
                  required
                  placeholder={t("fields.referralSourcePlaceholder")}
                  value={field.value ?? ""}
                  options={referralOptions}
                  disabled={isSubmitting}
                  error={errors.referralSource?.message}
                  onChange={field.onChange}
                  labelClassName={sponsorFieldLabelClassName}
                  triggerClassName={sponsorPillSelectTriggerClassName}
                />
              )}
            />

            {submitError ? (
              <p className="text-xs text-red-600 sm:text-sm" role="alert">
                {submitError}
              </p>
            ) : null}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={onSubmit}
              className="flex h-12 w-full items-center justify-center rounded-full bg-primary-500 font-montserrat text-base font-bold text-white shadow-lg shadow-primary-600/10 transition-opacity hover:opacity-95 disabled:opacity-50 sm:h-[62px] sm:text-lg"
            >
              {isSubmitting ? "…" : t("submit")}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
