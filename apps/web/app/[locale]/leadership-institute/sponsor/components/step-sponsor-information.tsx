"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import {
  FormFieldLabel,
  formFieldGroupClassName,
} from "@/components/forms/form-field-label";
import { FormSelectField } from "@/components/forms/form-select-field";
import { PhoneInputField } from "@/components/forms/phone-input-field";
import { WordCountTextarea } from "@/components/forms/word-count-textarea";
import { Input } from "@/components/ui/input";
import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";
import {
  publicStatementSharingValues,
  sponsorTypeValues,
} from "@/lib/forms/schemas/leadership-institute-sponsor";
import { cn } from "@/lib/utils";

import {
  sponsorFieldLabelClassName,
  sponsorFormGridClassName,
  sponsorHalfWidthClassName,
  sponsorPillPlaceholderClassName,
  sponsorSectionHeadingClassName,
} from "./sponsor-form-field-styles";

const MAX_WORDS = 150;
const labelClassName = sponsorFieldLabelClassName;
const wordCountClassName =
  "text-right font-poppins text-base leading-[1.2] text-neutral-500";

const radioOptionLabelClassName =
  "inline-flex cursor-pointer items-center gap-2 font-poppins text-lg leading-[1.3] text-neutral-1000";

const radioOptionRowClassName = "flex flex-wrap items-center gap-x-6 gap-y-3";

type SponsorTextFieldProps = {
  id: string;
  name: keyof LeadershipInstituteSponsorValues;
  label: string;
  required?: boolean;
  placeholder?: string;
  italicPlaceholder?: boolean;
  autoComplete?: string;
  type?: string;
};

function SponsorTextField({
  id,
  name,
  label,
  required = false,
  placeholder,
  italicPlaceholder = false,
  autoComplete,
  type = "text",
}: SponsorTextFieldProps) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  return (
    <div className={formFieldGroupClassName}>
      <FormFieldLabel
        htmlFor={id}
        required={required}
        className={labelClassName}
      >
        {label}
      </FormFieldLabel>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        disabled={isSubmitting}
        placeholder={placeholder}
        aria-invalid={Boolean(errors[name])}
        className={cn(italicPlaceholder && sponsorPillPlaceholderClassName)}
        {...register(name)}
      />
      <FormFieldError message={errors[name]?.message as string | undefined} />
    </div>
  );
}

type SponsorWordCountFieldProps = {
  name: "sponsorWhy" | "communitiesToSupport";
  label: React.ReactNode;
  placeholder: string;
};

function SponsorWordCountField({
  name,
  label,
  placeholder,
}: SponsorWordCountFieldProps) {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <WordCountTextarea
          id={`sponsor-${name}`}
          label={label}
          placeholder={placeholder}
          value={field.value ?? ""}
          maxWords={MAX_WORDS}
          variant="long"
          disabled={isSubmitting}
          error={errors[name]?.message}
          labelClassName={labelClassName}
          wordCountClassName={wordCountClassName}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}

export function StepSponsorInformation() {
  const t = useTranslations("leadershipInstituteSponsor");
  const tStep2 = useTranslations("leadershipInstituteSponsor.step2");
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <h2 className={sponsorSectionHeadingClassName}>
          {tStep2("sections.personalInformation")}
        </h2>

        <div className={sponsorFormGridClassName}>
          <SponsorTextField
            id="sponsor-firstName"
            name="firstName"
            label={t("fields.firstName")}
            required
            autoComplete="given-name"
          />
          <SponsorTextField
            id="sponsor-lastName"
            name="lastName"
            label={t("fields.lastName")}
            required
            autoComplete="family-name"
          />
          <SponsorTextField
            id="sponsor-email"
            name="email"
            label={t("fields.email")}
            required
            type="email"
            autoComplete="email"
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInputField
                id="sponsor-phone"
                label={t("fields.phone")}
                required
                value={field.value}
                disabled={isSubmitting}
                error={errors.phone?.message}
                labelClassName={labelClassName}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={sponsorSectionHeadingClassName}>
          {tStep2("sections.location")}
        </h2>

        <div className={sponsorFormGridClassName}>
          <SponsorTextField
            id="sponsor-city"
            name="city"
            label={t("fields.city")}
            required
            autoComplete="address-level2"
          />
          <SponsorTextField
            id="sponsor-state"
            name="state"
            label={t("fields.state")}
            required
            autoComplete="address-level1"
          />
        </div>

        <div className={sponsorHalfWidthClassName}>
          <SponsorTextField
            id="sponsor-mailingAddress"
            name="mailingAddress"
            label={t("fields.mailingAddress")}
            required
            autoComplete="street-address"
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={sponsorSectionHeadingClassName}>
          {tStep2("sections.professionalInformation")}
        </h2>

        <div className={sponsorFormGridClassName}>
          <SponsorTextField
            id="sponsor-currentRole"
            name="currentRole"
            label={t("fields.currentRole")}
            required
            placeholder={tStep2("placeholders.currentRole")}
            italicPlaceholder
          />
          <SponsorTextField
            id="sponsor-organization"
            name="organization"
            label={t("fields.organization")}
            required
            autoComplete="organization"
          />
        </div>

        <div className={sponsorHalfWidthClassName}>
          <Controller
            name="sponsorType"
            control={control}
            render={({ field }) => (
              <FormSelectField
                id="sponsor-sponsorType"
                label={t("fields.sponsorType")}
                placeholder={t("placeholders.selectOne")}
                value={field.value ?? ""}
                disabled={isSubmitting}
                error={errors.sponsorType?.message}
                labelClassName={labelClassName}
                onChange={field.onChange}
                options={sponsorTypeValues.map((value) => ({
                  value,
                  label: t(`options.sponsorType.${value}`),
                }))}
              />
            )}
          />
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className={sponsorSectionHeadingClassName}>
          {tStep2("sections.yourWhy")}
        </h2>

        <SponsorWordCountField
          name="sponsorWhy"
          label={tStep2("fields.sponsorWhy")}
          placeholder={tStep2("placeholders.sponsorWhy")}
        />

        <SponsorWordCountField
          name="communitiesToSupport"
          label={tStep2("fields.communitiesToSupport")}
          placeholder={tStep2("placeholders.communitiesToSupport")}
        />

        <fieldset className="flex flex-col gap-6">
          <legend className={labelClassName}>
            {tStep2("fields.publicStatementSharing")}
          </legend>
          <div className={radioOptionRowClassName}>
            {publicStatementSharingValues.map((value) => (
              <label key={value} className={radioOptionLabelClassName}>
                <input
                  type="radio"
                  value={value}
                  disabled={isSubmitting}
                  className="size-4 shrink-0 accent-primary-500"
                  {...register("publicStatementSharing")}
                />
                <span>{t(`options.publicStatementSharing.${value}`)}</span>
              </label>
            ))}
          </div>
          <FormFieldError message={errors.publicStatementSharing?.message} />
        </fieldset>
      </section>
    </div>
  );
}
