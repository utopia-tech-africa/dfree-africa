"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteApplicationValues } from "@/lib/forms/schemas/leadership-institute-application";
import {
  organizationTypeValues,
  yearsServedValues,
} from "@/lib/forms/schemas/leadership-institute-application";
import {
  FormFieldLabel,
  formFieldGroupClassName,
} from "@/components/forms/form-field-label";
import { FormSelectField } from "@/components/forms/form-select-field";
import { FormSectionHeading } from "@/components/forms/form-section-heading";
import { PhoneInputField } from "@/components/forms/phone-input-field";
import {
  applicationFieldClassName,
  WordCountTextarea,
} from "@/components/forms/word-count-textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function StepAboutYou() {
  const t = useTranslations("leadershipInstituteApplication.step1");
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteApplicationValues>();

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-neutral-1000 font-montserrat md:text-3xl">
          {t("title")}
        </h2>
        <p className="text-sm text-neutral-700 md:text-base">{t("subtitle")}</p>
      </div>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.personalInformation")} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={formFieldGroupClassName}>
            <FormFieldLabel htmlFor="firstName" required>
              {t("fields.firstName")}
            </FormFieldLabel>
            <Input
              id="firstName"
              placeholder={t("placeholders.firstName")}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.firstName)}
              className={applicationFieldClassName}
              {...register("firstName")}
            />
            <FormFieldError message={errors.firstName?.message} />
          </div>

          <div className={formFieldGroupClassName}>
            <FormFieldLabel htmlFor="lastName" required>
              {t("fields.lastName")}
            </FormFieldLabel>
            <Input
              id="lastName"
              placeholder={t("placeholders.lastName")}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.lastName)}
              className={applicationFieldClassName}
              {...register("lastName")}
            />
            <FormFieldError message={errors.lastName?.message} />
          </div>

          <div className={formFieldGroupClassName}>
            <FormFieldLabel htmlFor="email" required>
              {t("fields.email")}
            </FormFieldLabel>
            <Input
              id="email"
              type="email"
              placeholder={t("placeholders.email")}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.email)}
              className={applicationFieldClassName}
              {...register("email")}
            />
            <FormFieldError message={errors.email?.message} />
          </div>

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInputField
                label={t("fields.phone")}
                required
                value={field.value}
                disabled={isSubmitting}
                error={errors.phone?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </section>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.location")} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={formFieldGroupClassName}>
            <FormFieldLabel htmlFor="city" required>
              {t("fields.city")}
            </FormFieldLabel>
            <Input
              id="city"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.city)}
              className={applicationFieldClassName}
              {...register("city")}
            />
            <FormFieldError message={errors.city?.message} />
          </div>

          <div className={formFieldGroupClassName}>
            <FormFieldLabel htmlFor="state" required>
              {t("fields.state")}
            </FormFieldLabel>
            <Input
              id="state"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.state)}
              className={applicationFieldClassName}
              {...register("state")}
            />
            <FormFieldError message={errors.state?.message} />
          </div>

          <div className={cn(formFieldGroupClassName, "md:col-span-2")}>
            <FormFieldLabel htmlFor="mailingAddress" required>
              {t("fields.mailingAddress")}
            </FormFieldLabel>
            <Input
              id="mailingAddress"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.mailingAddress)}
              className={applicationFieldClassName}
              {...register("mailingAddress")}
            />
            <FormFieldError message={errors.mailingAddress?.message} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.professionalInformation")} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={formFieldGroupClassName}>
            <FormFieldLabel htmlFor="currentRole" required>
              {t("fields.currentRole")}
            </FormFieldLabel>
            <Input
              id="currentRole"
              placeholder={t("placeholders.currentRole")}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.currentRole)}
              className={applicationFieldClassName}
              {...register("currentRole")}
            />
            <FormFieldError message={errors.currentRole?.message} />
          </div>

          <div className={formFieldGroupClassName}>
            <FormFieldLabel htmlFor="organization" required>
              {t("fields.organization")}
            </FormFieldLabel>
            <Input
              id="organization"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.organization)}
              className={applicationFieldClassName}
              {...register("organization")}
            />
            <FormFieldError message={errors.organization?.message} />
          </div>

          <Controller
            name="organizationType"
            control={control}
            render={({ field }) => (
              <FormSelectField
                id="organizationType"
                label={t("fields.organizationType")}
                required
                placeholder={t("placeholders.selectOne")}
                value={field.value}
                disabled={isSubmitting}
                error={errors.organizationType?.message}
                onChange={field.onChange}
                options={organizationTypeValues.map((value) => ({
                  value,
                  label: t(`options.organizationType.${value}`),
                }))}
              />
            )}
          />

          <Controller
            name="yearsServed"
            control={control}
            render={({ field }) => (
              <FormSelectField
                id="yearsServed"
                label={t("fields.yearsServed")}
                required
                placeholder={t("placeholders.selectOne")}
                value={field.value}
                disabled={isSubmitting}
                error={errors.yearsServed?.message}
                onChange={field.onChange}
                options={yearsServedValues.map((value) => ({
                  value,
                  label: t(`options.yearsServed.${value}`),
                }))}
              />
            )}
          />

          <div className={cn(formFieldGroupClassName, "md:col-span-2")}>
            <FormFieldLabel htmlFor="communityServed" required>
              {t("fields.communityServed")}
            </FormFieldLabel>
            <Input
              id="communityServed"
              placeholder={t("placeholders.communityServed")}
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.communityServed)}
              className={applicationFieldClassName}
              {...register("communityServed")}
            />
            <FormFieldError message={errors.communityServed?.message} />
          </div>
        </div>

        <Controller
          name="organizationDescription"
          control={control}
          render={({ field }) => (
            <WordCountTextarea
              label={t("fields.organizationDescription")}
              placeholder={t("placeholders.organizationDescription")}
              value={field.value}
              maxWords={150}
              disabled={isSubmitting}
              error={errors.organizationDescription?.message}
              onChange={field.onChange}
            />
          )}
        />
      </section>
    </div>
  );
}
