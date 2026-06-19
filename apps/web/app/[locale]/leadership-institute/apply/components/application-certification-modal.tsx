"use client";

import { CalendarDays, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Controller, useFormContext } from "react-hook-form";

import { FormFieldLabel } from "@/components/forms/form-field-label";
import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteApplicationValues } from "@/lib/forms/schemas/leadership-institute-application";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const covenantCommitmentKeys = [
  "capstone",
  "alumniNetwork",
  "trainCommunity",
  "mentorApplicant",
  "annualReport",
  "representCredential",
] as const;

const getLocalDateInputValue = (date = new Date()) => {
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 10);
};

type ApplicationCertificationModalProps = {
  isSubmitting: boolean;
  submitError?: string | null;
  onClose: () => void;
  onSubmit: () => void;
};

const signatureInputId = "leadership-application-signature";
const signatureDateInputId = "leadership-application-signature-date";

export function ApplicationCertificationModal({
  isSubmitting,
  submitError,
  onClose,
  onSubmit,
}: ApplicationCertificationModalProps) {
  const t = useTranslations(
    "leadershipInstituteApplication.certificationModal",
  );
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<LeadershipInstituteApplicationValues>();

  useEffect(() => {
    setValue("signature", "", { shouldValidate: false });
    setValue("signatureDate", getLocalDateInputValue(), {
      shouldValidate: true,
    });
  }, [setValue]);

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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certification-modal-title"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-[833px] flex-col overflow-hidden rounded-[20px] border border-secondary-300/20 bg-neutral-100 shadow-xl">
        <div className="relative z-10 flex shrink-0 items-center justify-center rounded-t-[20px] bg-primary-500 px-4 py-4 shadow-xl sm:px-6 sm:py-5">
          <h2
            id="certification-modal-title"
            className="px-8 text-center font-montserrat text-lg font-bold leading-snug text-neutral-100 sm:px-10 sm:text-xl md:text-[32px] md:leading-[1.2]"
          >
            {t("title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label={t("close")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-100 transition-opacity hover:opacity-80 disabled:opacity-50 sm:right-6"
          >
            <X className="size-5 sm:size-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-5 pt-5 sm:px-4 sm:pb-6 sm:pt-8">
          <div className="mx-auto flex w-full max-w-[801px] flex-col gap-5 sm:gap-8">
            <section className="rounded-lg bg-primary-500 p-4 text-neutral-100 sm:p-6">
              <h3 className="font-montserrat text-base font-bold leading-snug sm:text-[22px] sm:leading-[1.2]">
                {t("covenant.title")}
              </h3>
              <p className="mt-2 font-poppins text-sm leading-relaxed text-neutral-200 sm:mt-3 sm:text-base sm:leading-[1.2]">
                {t("covenant.intro")}
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-4 font-poppins text-sm leading-relaxed text-neutral-200 sm:mt-4 sm:space-y-2 sm:pl-5 sm:text-base sm:leading-[1.2]">
                {covenantCommitmentKeys.map((key) => (
                  <li key={key}>{t(`covenant.commitments.${key}`)}</li>
                ))}
              </ul>
              <p className="mt-3 font-poppins text-xs italic leading-relaxed text-neutral-200 sm:mt-4 sm:text-sm sm:leading-[1.2]">
                {t("covenant.disclaimer")}
              </p>
            </section>

            <section className="space-y-2 sm:space-y-3">
              <h3 className="font-montserrat text-base font-bold leading-snug text-neutral-1000 sm:text-[22px] sm:leading-[1.2]">
                {t("certification.title")}
              </h3>
              <p className="font-poppins text-sm leading-relaxed text-neutral-900 sm:text-lg sm:leading-[1.3]">
                {t("certification.body")}
              </p>
            </section>

            <div className="grid gap-3 rounded-xl bg-neutral-300 p-2.5 sm:p-3 md:grid-cols-2 md:gap-2.5 md:p-4">
              <div className="flex flex-col gap-1">
                <FormFieldLabel htmlFor={signatureInputId} required>
                  {t("fields.signature")}
                </FormFieldLabel>
                <Controller
                  name="signature"
                  control={control}
                  render={({ field }) => (
                    <div className="flex min-h-14 items-center border-b border-neutral-900">
                      <Input
                        id={signatureInputId}
                        type="text"
                        autoComplete="name"
                        autoFocus
                        aria-invalid={Boolean(errors.signature)}
                        placeholder={t("fields.signaturePlaceholder")}
                        className="h-auto min-h-14 rounded-none border-0 bg-transparent px-[18px] py-0 font-poppins text-sm text-neutral-1000 shadow-none placeholder:text-neutral-500 focus-visible:ring-0 sm:text-base"
                        {...field}
                        value={field.value ?? ""}
                        disabled={false}
                      />
                    </div>
                  )}
                />
                <p className="min-h-5 px-[18px] font-poppins text-xs leading-5 text-neutral-700">
                  {t("fields.signatureHint")}
                </p>
                <FormFieldError message={errors.signature?.message} />
              </div>

              <div className="flex flex-col gap-1">
                <FormFieldLabel htmlFor={signatureDateInputId} required>
                  {t("fields.date")}
                </FormFieldLabel>
                <div className="relative flex min-h-14 items-center border-b border-neutral-900">
                  <CalendarDays
                    className="pointer-events-none absolute left-[18px] size-6 text-neutral-500"
                    aria-hidden
                  />
                  <input
                    id={signatureDateInputId}
                    type="date"
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.signatureDate)}
                    suppressHydrationWarning
                    className={cn(
                      "w-full border-0 bg-transparent py-0 pl-12 pr-[18px] font-poppins text-sm text-neutral-1000 outline-none disabled:opacity-50 sm:text-base",
                      "[&::-webkit-calendar-picker-indicator]:opacity-0",
                    )}
                    {...register("signatureDate")}
                  />
                </div>
                <p className="min-h-5 px-[18px] text-xs leading-5" aria-hidden>
                  &nbsp;
                </p>
                <FormFieldError message={errors.signatureDate?.message} />
              </div>
            </div>

            {submitError ? (
              <p className="text-xs text-red-600 sm:text-sm" role="alert">
                {submitError}
              </p>
            ) : null}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={onSubmit}
              className="flex h-12 w-full items-center justify-center rounded-full bg-primary-500 font-montserrat text-base font-bold text-neutral-100 shadow-lg shadow-primary-600/10 transition-opacity hover:opacity-95 disabled:opacity-50 sm:h-[62px] sm:text-lg"
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
