"use client";

import { Controller, useFormContext } from "react-hook-form";

import { sponsorCohortValues } from "@/lib/fellowship-sponsors/sponsor-cohorts";
import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";

import { CohortCard } from "./cohort-card";

export function CohortSelectionRow() {
  const {
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  return (
    <div className="space-y-3">
      <Controller
        name="sponsorCohort"
        control={control}
        render={({ field }) => (
          <div
            role="radiogroup"
            aria-label="Sponsor cohort"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
          >
            {sponsorCohortValues.map((cohort) => (
              <CohortCard
                key={cohort}
                cohort={cohort}
                isSelected={field.value === cohort}
                disabled={isSubmitting}
                onSelect={() => field.onChange(cohort)}
                onBlur={field.onBlur}
              />
            ))}
          </div>
        )}
      />
      <FormFieldError message={errors.sponsorCohort?.message} />
    </div>
  );
}
