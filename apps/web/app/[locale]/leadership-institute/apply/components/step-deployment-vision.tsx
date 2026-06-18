"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteApplicationValues } from "@/lib/forms/schemas/leadership-institute-application";
import {
  deploymentSettingValues,
  participationHistoryValues,
  type SuccessMetricValue,
} from "@/lib/forms/schemas/leadership-institute-application";
import { FormFieldLabel } from "@/components/forms/form-field-label";
import { RangeSliderField } from "@/components/forms/range-slider-field";
import { FormSelectField } from "@/components/forms/form-select-field";
import { FormSectionHeading } from "@/components/forms/form-section-heading";
import { WordCountTextarea } from "@/components/forms/word-count-textarea";
import { cn } from "@/lib/utils";

const successMetricsColumns = [
  ["attendance", "program_completion", "improved_financial_confidence"],
  ["savings_growth", "financial_goal_achievement", "other"],
  ["debt_reduction"],
] as const satisfies ReadonlyArray<ReadonlyArray<SuccessMetricValue>>;

export function StepDeploymentVision() {
  const t = useTranslations("leadershipInstituteApplication.step3");
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteApplicationValues>();

  const participationHistory = useWatch({
    control,
    name: "participationHistory",
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-neutral-1000 font-montserrat md:text-3xl">
          {t("title")}
        </h2>
        <p className="text-sm text-neutral-700 md:text-base">{t("subtitle")}</p>
      </div>

      <div className="rounded-xl bg-primary-500 px-6 py-5 text-white">
        <p className="text-lg font-semibold font-montserrat">
          {t("capstone.title")}
        </p>
        <p className="mt-2 text-sm text-white/90">{t("capstone.body")}</p>
      </div>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.communityStory")} />

        <Controller
          name="communityStory"
          control={control}
          render={({ field }) => (
            <WordCountTextarea
              label={t("fields.communityStory")}
              placeholder={t("placeholders.communityStory")}
              value={field.value}
              maxWords={150}
              disabled={isSubmitting}
              error={errors.communityStory?.message}
              onChange={field.onChange}
            />
          )}
        />
      </section>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.futureProject")} />

        <Controller
          name="whoToTrain"
          control={control}
          render={({ field }) => (
            <WordCountTextarea
              label={t("fields.whoToTrain")}
              required
              placeholder={t("placeholders.whoToTrain")}
              value={field.value}
              maxWords={150}
              disabled={isSubmitting}
              error={errors.whoToTrain?.message}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="peopleToReach"
          control={control}
          render={({ field }) => (
            <RangeSliderField
              id="peopleToReach"
              label={t("fields.peopleToReach")}
              required
              value={field.value}
              disabled={isSubmitting}
              error={errors.peopleToReach?.message}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="setting"
          control={control}
          render={({ field }) => (
            <FormSelectField
              id="setting"
              label={t("fields.setting")}
              required
              placeholder={t("placeholders.selectOne")}
              value={field.value}
              disabled={isSubmitting}
              error={errors.setting?.message}
              onChange={field.onChange}
              options={deploymentSettingValues.map((value) => ({
                value,
                label: t(`options.setting.${value}`),
              }))}
            />
          )}
        />

        <fieldset className="space-y-3.5">
          <FormFieldLabel required>
            {t("fields.participationHistory")}
          </FormFieldLabel>

          <div className="flex flex-wrap gap-3">
            {participationHistoryValues.map((value) => (
              <label
                key={value}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-2 bg-white px-3 py-2 text-sm transition-colors",
                  participationHistory === value ? "" : "text-neutral-800",
                )}
              >
                <input
                  type="radio"
                  value={value}
                  disabled={isSubmitting}
                  className="size-4 accent-primary-500"
                  {...register("participationHistory")}
                />
                {t(`options.participationHistory.${value}`)}
              </label>
            ))}
          </div>

          <FormFieldError message={errors.participationHistory?.message} />
        </fieldset>

        <fieldset className="space-y-3.5">
          <FormFieldLabel required>{t("fields.successMetrics")}</FormFieldLabel>

          <Controller
            name="successMetrics"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-3">
                {successMetricsColumns.map((column) => (
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
                          {t(`options.successMetrics.${value}`)}
                        </label>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          />

          <FormFieldError message={errors.successMetrics?.message} />
        </fieldset>

        <Controller
          name="projectVision"
          control={control}
          render={({ field }) => (
            <WordCountTextarea
              label={t("fields.projectVision")}
              value={field.value}
              maxWords={150}
              disabled={isSubmitting}
              error={errors.projectVision?.message}
              onChange={field.onChange}
            />
          )}
        />
      </section>
    </div>
  );
}
