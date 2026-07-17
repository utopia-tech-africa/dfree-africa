"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import {
  FormFieldLabel,
  formFieldGroupClassName,
} from "@/components/forms/form-field-label";
import { Input } from "@/components/ui/input";
import {
  formatSponsorshipCurrency,
  getSponsorshipTotal,
} from "@/lib/fellowship-sponsors/sponsorship-pricing";
import { FormFieldError } from "@/lib/forms/form-field-error";
import {
  paymentMethodValues,
  type LeadershipInstituteSponsorValues,
  type PaymentMethodValue,
} from "@/lib/forms/schemas/leadership-institute-sponsor";
import { cn } from "@/lib/utils";

import {
  sponsorFieldLabelClassName,
  sponsorSectionHeadingClassName,
} from "./sponsor-form-field-styles";

export function PaymentMethodSection() {
  const t = useTranslations("leadershipInstituteSponsor.step3");
  const {
    control,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  const paymentMethod = watch("paymentMethod") as PaymentMethodValue | "";
  const sponsorshipTier = watch("sponsorshipTier");
  const customFellowCount = watch("customFellowCount");
  const sponsorshipAmount = sponsorshipTier
    ? getSponsorshipTotal(sponsorshipTier, Number(customFellowCount) || 1)
    : 0;

  return (
    <section className="space-y-4">
      <h2 className={sponsorSectionHeadingClassName}>{t("paymentTitle")}</h2>

      <div className="space-y-4">
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div
              className="flex overflow-hidden rounded-t-lg border border-neutral-300"
              role="tablist"
              aria-label={t("paymentTitle")}
            >
              {paymentMethodValues.map((method) => {
                const isSelected = field.value === method;

                return (
                  <button
                    key={method}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    disabled={isSubmitting}
                    onClick={() => field.onChange(method)}
                    className={cn(
                      "flex-1 border-r border-neutral-300 px-3 py-3 font-poppins text-sm leading-[1.3] transition-colors last:border-r-0 md:px-4 md:text-base",
                      isSelected
                        ? "bg-primary-500 font-medium text-white"
                        : "bg-white text-neutral-1000 hover:bg-neutral-50",
                      isSubmitting && "cursor-not-allowed opacity-60",
                    )}
                  >
                    {t(`paymentMethods.${method}.tab`)}
                  </button>
                );
              })}
            </div>
          )}
        />

        <FormFieldError message={errors.paymentMethod?.message} />

        {paymentMethod === "check_ach" ? (
          <div className="space-y-4" role="tabpanel">
            <p className="font-poppins text-base leading-[1.4] text-neutral-900">
              {t("paymentMethods.check_ach.instructions")}
            </p>

            <div className="rounded-xl bg-neutral-200 px-5 py-5 md:px-6 md:py-6">
              <p className="font-poppins text-base font-bold leading-[1.3] text-primary-500">
                {t("paymentMethods.check_ach.mailToLabel")}
              </p>
              <p className="mt-2 whitespace-pre-line font-poppins text-base leading-normal text-neutral-900">
                {t("paymentMethods.check_ach.mailToAddress")}
              </p>
            </div>

            <div className={formFieldGroupClassName}>
              <FormFieldLabel
                htmlFor="check-number"
                className={sponsorFieldLabelClassName}
              >
                {t("paymentMethods.check_ach.checkNumberLabel")}
              </FormFieldLabel>
              <Input
                id="check-number"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.checkNumber)}
                className="rounded-full"
                {...register("checkNumber")}
              />
              <FormFieldError message={errors.checkNumber?.message} />
            </div>
          </div>
        ) : null}

        {paymentMethod === "credit_card" ? (
          <div className="space-y-3" role="tabpanel">
            <p className="font-poppins text-base leading-[1.4] text-neutral-900">
              {t("paymentMethods.credit_card.body", {
                amount: formatSponsorshipCurrency(sponsorshipAmount),
              })}
            </p>
            <p className="font-poppins text-sm leading-[1.4] text-neutral-700">
              {t("paymentMethods.credit_card.lockedAmountNote")}
            </p>
          </div>
        ) : null}

        {paymentMethod === "wire_transfer" ? (
          <div role="tabpanel">
            <p className="font-poppins text-base leading-[1.4] text-neutral-900">
              {t("paymentMethods.wire_transfer.body")}
            </p>
          </div>
        ) : null}

        {paymentMethod === "pledge_invoice" ? (
          <div role="tabpanel">
            <p className="font-poppins text-base leading-[1.4] text-neutral-900">
              {t("paymentMethods.pledge_invoice.body")}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
