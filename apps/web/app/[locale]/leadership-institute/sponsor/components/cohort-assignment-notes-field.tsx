"use client";

import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import { WordCountTextarea } from "@/components/forms/word-count-textarea";
import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";

import { sponsorFieldLabelClassName } from "./sponsor-form-field-styles";

const MAX_WORDS = 150;

const wordCountClassName =
  "text-right font-poppins text-base leading-[1.2] text-neutral-500";

export function CohortAssignmentNotesField() {
  const t = useTranslations("leadershipInstituteSponsor.step1");
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  return (
    <Controller
      name="cohortAssignmentNotes"
      control={control}
      render={({ field }) => (
        <WordCountTextarea
          id="sponsor-cohortAssignmentNotes"
          label={t("cohortAssignmentNotes")}
          placeholder={t("cohortAssignmentNotesPlaceholder")}
          value={field.value ?? ""}
          maxWords={MAX_WORDS}
          variant="long"
          disabled={isSubmitting}
          error={errors.cohortAssignmentNotes?.message}
          labelClassName={sponsorFieldLabelClassName}
          wordCountClassName={wordCountClassName}
          onChange={field.onChange}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}
