"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteApplicationValues } from "@/lib/forms/schemas/leadership-institute-application";
import {
  cohortTermValues,
  commitmentValues,
  type ReferralSourceValue,
} from "@/lib/forms/schemas/leadership-institute-application";
import {
  FormFieldLabel,
  formFieldGroupClassName,
} from "@/components/forms/form-field-label";
import { FormSectionHeading } from "@/components/forms/form-section-heading";
import { PhoneInputField } from "@/components/forms/phone-input-field";
import {
  applicationFieldClassName,
  WordCountTextarea,
} from "@/components/forms/word-count-textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const referralSourceColumns = [
  ["fellow_referral", "church"],
  ["website", "organization"],
  ["social_media", "academic"],
  ["other"],
] as const satisfies ReadonlyArray<ReadonlyArray<ReferralSourceValue>>;

const radioOptionLabelClassName =
  "inline-flex cursor-pointer items-center gap-2 text-sm text-neutral-800";

const radioOptionRowClassName = "flex flex-wrap items-center gap-x-8 gap-y-3";

type ReferenceFieldsProps = {
  prefix: "reference1" | "reference2";
  title: string;
};

function ReferenceFields({ prefix, title }: ReferenceFieldsProps) {
  const t = useTranslations("leadershipInstituteApplication.step4");
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteApplicationValues>();

  const referenceErrors = errors[prefix];

  return (
    <section className="space-y-4 border-neutral-200 py-4 md:py-6">
      <FormSectionHeading title={title} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className={formFieldGroupClassName}>
          <FormFieldLabel htmlFor={`${prefix}-fullName`} required>
            {t("fields.fullName")}
          </FormFieldLabel>
          <Input
            id={`${prefix}-fullName`}
            disabled={isSubmitting}
            aria-invalid={Boolean(referenceErrors?.fullName)}
            className={applicationFieldClassName}
            {...register(`${prefix}.fullName`)}
          />
          <FormFieldError message={referenceErrors?.fullName?.message} />
        </div>

        <div className={formFieldGroupClassName}>
          <FormFieldLabel htmlFor={`${prefix}-relationship`} required>
            {t("fields.relationship")}
          </FormFieldLabel>
          <Input
            id={`${prefix}-relationship`}
            disabled={isSubmitting}
            aria-invalid={Boolean(referenceErrors?.relationship)}
            className={applicationFieldClassName}
            {...register(`${prefix}.relationship`)}
          />
          <FormFieldError message={referenceErrors?.relationship?.message} />
        </div>

        <div className={formFieldGroupClassName}>
          <FormFieldLabel htmlFor={`${prefix}-email`} required>
            {t("fields.email")}
          </FormFieldLabel>
          <Input
            id={`${prefix}-email`}
            type="email"
            disabled={isSubmitting}
            aria-invalid={Boolean(referenceErrors?.email)}
            className={applicationFieldClassName}
            {...register(`${prefix}.email`)}
          />
          <FormFieldError message={referenceErrors?.email?.message} />
        </div>

        <Controller
          name={`${prefix}.phone`}
          control={control}
          render={({ field }) => (
            <PhoneInputField
              label={t("fields.phone")}
              required
              value={field.value}
              disabled={isSubmitting}
              error={referenceErrors?.phone?.message}
              onChange={field.onChange}
            />
          )}
        />

        <div className={cn(formFieldGroupClassName, "md:col-span-2")}>
          <FormFieldLabel htmlFor={`${prefix}-organizationTitle`} required>
            {t("fields.organizationTitle")}
          </FormFieldLabel>
          <Input
            id={`${prefix}-organizationTitle`}
            disabled={isSubmitting}
            aria-invalid={Boolean(referenceErrors?.organizationTitle)}
            className={applicationFieldClassName}
            {...register(`${prefix}.organizationTitle`)}
          />
          <FormFieldError
            message={referenceErrors?.organizationTitle?.message}
          />
        </div>
      </div>
    </section>
  );
}

export function StepReviewSubmit() {
  const t = useTranslations("leadershipInstituteApplication.step4");
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteApplicationValues>();

  const commitment = useWatch({ control, name: "commitment" });
  const showConstraints = commitment === "mostly_with_constraints";

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-neutral-1000 font-montserrat md:text-3xl">
          {t("title")}
        </h2>
      </div>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.references")} />
        <ReferenceFields prefix="reference1" title={t("reference1")} />
        <ReferenceFields prefix="reference2" title={t("reference2")} />
      </section>

      <section className="space-y-6">
        <FormSectionHeading title={t("sections.availabilityCommitment")} />

        <fieldset className={formFieldGroupClassName}>
          <FormFieldLabel required>{t("fields.cohortTerm")}</FormFieldLabel>
          <div className={radioOptionRowClassName}>
            {cohortTermValues.map((value) => (
              <label key={value} className={radioOptionLabelClassName}>
                <input
                  type="radio"
                  value={value}
                  disabled={isSubmitting}
                  className="size-4 shrink-0 accent-primary-500"
                  {...register("cohortTerm")}
                />
                <span>{t(`options.cohortTerm.${value}.label`)}</span>
              </label>
            ))}
          </div>
          <FormFieldError message={errors.cohortTerm?.message} />
        </fieldset>

        <fieldset className={formFieldGroupClassName}>
          <FormFieldLabel required>{t("fields.commitment")}</FormFieldLabel>
          <div className={radioOptionRowClassName}>
            {commitmentValues.map((value) => (
              <label key={value} className={radioOptionLabelClassName}>
                <input
                  type="radio"
                  value={value}
                  disabled={isSubmitting}
                  className="size-4 shrink-0 accent-primary-500"
                  {...register("commitment")}
                />
                <span>{t(`options.commitment.${value}`)}</span>
              </label>
            ))}
          </div>
          <FormFieldError message={errors.commitment?.message} />
        </fieldset>

        <Controller
          name="schedulingConstraints"
          control={control}
          render={({ field }) => (
            <WordCountTextarea
              label={t("fields.schedulingConstraints")}
              required={showConstraints}
              value={field.value}
              maxWords={150}
              disabled={isSubmitting}
              error={errors.schedulingConstraints?.message}
              onChange={field.onChange}
            />
          )}
        />

        <fieldset className={formFieldGroupClassName}>
          <FormFieldLabel required>
            {t("fields.referralSources")}
          </FormFieldLabel>
          <Controller
            name="referralSources"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
                {referralSourceColumns.map((column) => (
                  <div key={column.join("-")} className="flex flex-col gap-2">
                    {column.map((value) => {
                      const checked = field.value.includes(value);

                      return (
                        <label
                          key={value}
                          className="inline-flex cursor-pointer items-center gap-2 text-sm text-neutral-800"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={isSubmitting}
                            className="size-4 rounded accent-primary-500"
                            onChange={(event) => {
                              if (event.target.checked) {
                                field.onChange([...field.value, value]);
                                return;
                              }

                              field.onChange(
                                field.value.filter((item) => item !== value),
                              );
                            }}
                          />
                          {t(`options.referralSources.${value}`)}
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          />
          <FormFieldError message={errors.referralSources?.message} />
        </fieldset>
      </section>
    </div>
  );
}
