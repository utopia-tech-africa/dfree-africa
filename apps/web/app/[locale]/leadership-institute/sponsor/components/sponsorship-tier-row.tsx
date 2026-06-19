"use client";

import { Controller, useFormContext } from "react-hook-form";

import { TIER_FELLOW_COUNTS } from "@/lib/fellowship-sponsors/sponsorship-pricing";
import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";
import { presetSponsorshipTierValues } from "@/lib/forms/schemas/leadership-institute-sponsor";

import { SponsorshipTierCard } from "./sponsorship-tier-card";

export function SponsorshipTierRow() {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  return (
    <div className="space-y-3">
      <Controller
        name="sponsorshipTier"
        control={control}
        render={({ field }) => (
          <div
            role="radiogroup"
            aria-label="Sponsorship tier"
            className="grid grid-cols-1 gap-6 overflow-visible sm:grid-cols-2 xl:grid-cols-4"
          >
            {presetSponsorshipTierValues.map((tier) => (
              <SponsorshipTierCard
                key={tier}
                tier={tier}
                isSelected={field.value === tier}
                disabled={isSubmitting}
                onSelect={() => {
                  field.onChange(tier);
                  setValue("customFellowCount", TIER_FELLOW_COUNTS[tier]);
                }}
                onBlur={field.onBlur}
              />
            ))}
          </div>
        )}
      />
      <FormFieldError message={errors.sponsorshipTier?.message} />
    </div>
  );
}
