"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteApplicationValues } from "@/lib/forms/schemas/leadership-institute-application";
import { financialLiteracyExperienceValues } from "@/lib/forms/schemas/leadership-institute-application";
import { FormFieldLabel } from "@/components/forms/form-field-label";
import { FormSectionHeading } from "@/components/forms/form-section-heading";
import { WordCountTextarea } from "@/components/forms/word-count-textarea";
import { cn } from "@/lib/utils";

export function StepCommunityImpact() {
  const t = useTranslations("leadershipInstituteApplication.step2");
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteApplicationValues>();

  const experience = useWatch({
    control,
    name: "financialLiteracyExperience",
  });

  const showProgramDescription =
    experience !== "" && experience !== "no_prior_experience";

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-neutral-1000 font-montserrat md:text-3xl">
          {t("title")}
        </h2>
        <p className="text-sm text-neutral-700 md:text-base">{t("subtitle")}</p>
      </div>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.financialLiteracyExperience")} />

        <fieldset className="space-y-3.5">
          <legend className="sr-only">
            {t("fields.financialLiteracyExperience")}
          </legend>
          <FormFieldLabel required>
            {t("fields.financialLiteracyExperience")}
          </FormFieldLabel>

          <div className="flex flex-wrap gap-3">
            {financialLiteracyExperienceValues.map((value) => (
              <label
                key={value}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors",
                  experience === value
                    ? "text-primary-600"
                    : "text-neutral-800 hover:border-primary-400",
                )}
              >
                <input
                  type="radio"
                  value={value}
                  disabled={isSubmitting}
                  className="size-4 accent-primary-500"
                  {...register("financialLiteracyExperience")}
                />
                {t(`options.financialLiteracyExperience.${value}`)}
              </label>
            ))}
          </div>

          <FormFieldError
            message={errors.financialLiteracyExperience?.message}
          />
        </fieldset>

        {showProgramDescription ? (
          <Controller
            name="programDescription"
            control={control}
            render={({ field }) => (
              <WordCountTextarea
                label={t("fields.programDescription")}
                required
                placeholder={t("placeholders.programDescription")}
                value={field.value}
                maxWords={150}
                disabled={isSubmitting}
                error={errors.programDescription?.message}
                onChange={field.onChange}
              />
            )}
          />
        ) : null}
      </section>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.communityChallenges")} />

        <Controller
          name="communityChallenges"
          control={control}
          render={({ field }) => (
            <WordCountTextarea
              label={t("fields.communityChallenges")}
              required
              placeholder={t("placeholders.communityChallenges")}
              value={field.value}
              maxWords={150}
              disabled={isSubmitting}
              error={errors.communityChallenges?.message}
              onChange={field.onChange}
            />
          )}
        />
      </section>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.motivation")} />

        <Controller
          name="motivation"
          control={control}
          render={({ field }) => (
            <WordCountTextarea
              label={t("fields.motivation")}
              required
              value={field.value}
              maxWords={150}
              disabled={isSubmitting}
              error={errors.motivation?.message}
              onChange={field.onChange}
            />
          )}
        />
      </section>

      <div className="rounded-xl bg-primary-500 px-6 py-5 text-white">
        <p className="text-lg font-semibold font-montserrat">
          {t("encouragement.title")}
        </p>
        <p className="mt-1 text-sm text-white/90">{t("encouragement.body")}</p>
      </div>
    </div>
  );
}
