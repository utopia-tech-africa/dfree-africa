"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { FormFieldError } from "@/lib/forms/form-field-error";
import {
  recognitionPreferenceValues,
  type LeadershipInstituteSponsorValues,
  type RecognitionPreferenceValue,
} from "@/lib/forms/schemas/leadership-institute-sponsor";

import { sponsorSectionHeadingClassName } from "./sponsor-form-field-styles";
import { RecognitionOptionCard } from "./recognition-option-card";

export function RecognitionOptionsGrid() {
  const t = useTranslations("leadershipInstituteSponsor.step3");
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  return (
    <section className="space-y-4">
      <h2 className={sponsorSectionHeadingClassName}>
        {t("recognitionTitle")}
      </h2>

      <Controller
        name="recognitionPreferences"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {recognitionPreferenceValues.map((value) => {
              const checked = (field.value ?? []).includes(value);

              return (
                <RecognitionOptionCard
                  key={value}
                  value={value}
                  checked={checked}
                  disabled={isSubmitting}
                  onChange={(nextChecked) => {
                    const current = (field.value ??
                      []) as RecognitionPreferenceValue[];

                    if (nextChecked) {
                      field.onChange([...current, value]);
                      return;
                    }

                    field.onChange(current.filter((item) => item !== value));
                  }}
                />
              );
            })}
          </div>
        )}
      />

      <FormFieldError message={errors.recognitionPreferences?.message} />
    </section>
  );
}
