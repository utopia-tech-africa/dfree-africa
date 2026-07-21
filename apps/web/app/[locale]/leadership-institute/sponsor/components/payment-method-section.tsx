"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { FormDateField } from "@/components/forms/form-date-field";
import {
  FormFieldLabel,
  formFieldGroupClassName,
} from "@/components/forms/form-field-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  sponsorFormGridClassName,
  sponsorPillSelectTriggerClassName,
  sponsorSectionHeadingClassName,
  sponsorTextareaClassName,
} from "./sponsor-form-field-styles";

const pillInputClassName = "rounded-full";

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

      <div className="space-y-6">
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div
              className="flex w-full overflow-hidden rounded-lg shadow-xs"
              role="tablist"
              aria-label={t("paymentTitle")}
            >
              {paymentMethodValues.map((method, index) => {
                const isSelected = field.value === method;
                const isFirst = index === 0;
                const isLast = index === paymentMethodValues.length - 1;

                return (
                  <button
                    key={method}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    disabled={isSubmitting}
                    onClick={() => field.onChange(method)}
                    className={cn(
                      "-ml-px flex flex-1 items-center justify-center border px-3 py-3.5 font-poppins text-sm leading-[1.2] transition-colors first:ml-0 md:px-4 md:text-base",
                      isFirst && "rounded-l-md",
                      isLast && "rounded-r-lg",
                      isSelected
                        ? "z-[1] border-primary-500 bg-primary-500 text-white"
                        : "border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50",
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
            <p className="font-poppins text-lg leading-[1.3] text-neutral-900">
              {t("paymentMethods.check_ach.instructions")}
            </p>

            <div className="space-y-2.5 rounded-lg bg-primary-500/10 p-3">
              <p className="font-montserrat text-xl font-bold leading-[1.2] text-primary-500">
                {t("paymentMethods.check_ach.mailToLabel")}
              </p>
              <p className="whitespace-pre-line font-poppins text-base leading-[1.2] text-neutral-800">
                {t("paymentMethods.check_ach.mailToAddress")}
              </p>
            </div>

            <div
              className={cn(
                formFieldGroupClassName,
                "md:max-w-[calc(50%-5px)]",
              )}
            >
              <FormFieldLabel
                htmlFor="check-number"
                className={sponsorFieldLabelClassName}
              >
                {t("paymentMethods.check_ach.checkNumberLabel")}{" "}
                <span className="italic">
                  {t("paymentMethods.check_ach.checkNumberOptional")}
                </span>
              </FormFieldLabel>
              <Input
                id="check-number"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.checkNumber)}
                className={pillInputClassName}
                {...register("checkNumber")}
              />
              <FormFieldError message={errors.checkNumber?.message} />
            </div>
          </div>
        ) : null}

        {paymentMethod === "credit_card" ? (
          <div className="space-y-6" role="tabpanel">
            <p className="font-poppins text-lg leading-[1.3] text-neutral-900">
              {t("paymentMethods.credit_card.body", {
                amount: formatSponsorshipCurrency(sponsorshipAmount),
              })}
            </p>
            <p className="font-poppins text-base leading-[1.3] text-neutral-700">
              {t("paymentMethods.credit_card.lockedAmountNote")}
            </p>
          </div>
        ) : null}

        {paymentMethod === "wire_transfer" ? (
          <div className="space-y-4" role="tabpanel">
            <p className="font-poppins text-lg leading-[1.3] text-neutral-900">
              {t("paymentMethods.wire_transfer.body")}
            </p>
            <Controller
              name="anticipatedWireDate"
              control={control}
              render={({ field }) => (
                <FormDateField
                  id="anticipated-wire-date"
                  label={t(
                    "paymentMethods.wire_transfer.anticipatedWireDateLabel",
                  )}
                  value={field.value ?? ""}
                  disabled={isSubmitting}
                  error={errors.anticipatedWireDate?.message}
                  onChange={field.onChange}
                  className="md:max-w-[calc(50%-5px)]"
                  labelClassName={sponsorFieldLabelClassName}
                  triggerClassName={sponsorPillSelectTriggerClassName}
                />
              )}
            />
          </div>
        ) : null}

        {paymentMethod === "pledge_invoice" ? (
          <div className="space-y-6" role="tabpanel">
            <p className="font-poppins text-lg leading-[1.3] text-neutral-900">
              {t("paymentMethods.pledge_invoice.body")}
            </p>

            <div className="space-y-6">
              <div className={sponsorFormGridClassName}>
                <div className={formFieldGroupClassName}>
                  <FormFieldLabel
                    htmlFor="invoice-recipient-name"
                    required
                    className={sponsorFieldLabelClassName}
                  >
                    {t(
                      "paymentMethods.pledge_invoice.invoiceRecipientNameLabel",
                    )}
                  </FormFieldLabel>
                  <Input
                    id="invoice-recipient-name"
                    disabled={isSubmitting}
                    placeholder={t(
                      "paymentMethods.pledge_invoice.invoiceRecipientNamePlaceholder",
                    )}
                    aria-invalid={Boolean(errors.invoiceRecipientName)}
                    className={pillInputClassName}
                    {...register("invoiceRecipientName")}
                  />
                  <FormFieldError
                    message={errors.invoiceRecipientName?.message}
                  />
                </div>

                <div className={formFieldGroupClassName}>
                  <FormFieldLabel
                    htmlFor="invoice-email"
                    required
                    className={sponsorFieldLabelClassName}
                  >
                    {t("paymentMethods.pledge_invoice.invoiceEmailLabel")}
                  </FormFieldLabel>
                  <Input
                    id="invoice-email"
                    type="email"
                    disabled={isSubmitting}
                    placeholder={t(
                      "paymentMethods.pledge_invoice.invoiceEmailPlaceholder",
                    )}
                    aria-invalid={Boolean(errors.invoiceEmail)}
                    className={pillInputClassName}
                    {...register("invoiceEmail")}
                  />
                  <FormFieldError message={errors.invoiceEmail?.message} />
                </div>
              </div>

              <div className={sponsorFormGridClassName}>
                <div className={formFieldGroupClassName}>
                  <FormFieldLabel
                    htmlFor="purchase-order-number"
                    className={sponsorFieldLabelClassName}
                  >
                    {t(
                      "paymentMethods.pledge_invoice.purchaseOrderNumberLabel",
                    )}
                  </FormFieldLabel>
                  <Input
                    id="purchase-order-number"
                    disabled={isSubmitting}
                    placeholder={t(
                      "paymentMethods.pledge_invoice.purchaseOrderNumberPlaceholder",
                    )}
                    aria-invalid={Boolean(errors.purchaseOrderNumber)}
                    className={pillInputClassName}
                    {...register("purchaseOrderNumber")}
                  />
                  <FormFieldError
                    message={errors.purchaseOrderNumber?.message}
                  />
                </div>

                <Controller
                  name="requestedPaymentDate"
                  control={control}
                  render={({ field }) => (
                    <FormDateField
                      id="requested-payment-date"
                      label={t(
                        "paymentMethods.pledge_invoice.requestedPaymentDateLabel",
                      )}
                      value={field.value ?? ""}
                      disabled={isSubmitting}
                      error={errors.requestedPaymentDate?.message}
                      onChange={field.onChange}
                      labelClassName={sponsorFieldLabelClassName}
                      triggerClassName={sponsorPillSelectTriggerClassName}
                    />
                  )}
                />
              </div>

              <div className={formFieldGroupClassName}>
                <FormFieldLabel
                  htmlFor="special-billing-instructions"
                  className={sponsorFieldLabelClassName}
                >
                  {t(
                    "paymentMethods.pledge_invoice.specialBillingInstructionsLabel",
                  )}
                </FormFieldLabel>
                <Textarea
                  id="special-billing-instructions"
                  disabled={isSubmitting}
                  placeholder={t(
                    "paymentMethods.pledge_invoice.specialBillingInstructionsPlaceholder",
                  )}
                  aria-invalid={Boolean(errors.specialBillingInstructions)}
                  className={sponsorTextareaClassName}
                  {...register("specialBillingInstructions")}
                />
                <FormFieldError
                  message={errors.specialBillingInstructions?.message}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
