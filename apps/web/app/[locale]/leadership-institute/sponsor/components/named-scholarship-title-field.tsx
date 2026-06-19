"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";
import { Input } from "@/components/ui/input";

const inputClassName = "md:w-1/2";

export function NamedScholarshipTitleField() {
  const t = useTranslations("leadershipInstituteSponsor.step1");
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label
        htmlFor="sponsor-namedScholarshipTitle"
        className="block w-full font-poppins text-lg leading-[1.3] text-neutral-1000"
      >
        <span className="font-bold">{t("namedScholarshipTitle")}</span>{" "}
        <span className="font-normal text-neutral-600">
          {t("namedScholarshipTitleHint")}
        </span>
      </label>

      <Input
        id="sponsor-namedScholarshipTitle"
        type="text"
        autoComplete="off"
        disabled={isSubmitting}
        aria-invalid={Boolean(errors.namedScholarshipTitle)}
        placeholder={t("namedScholarshipTitlePlaceholder")}
        className={inputClassName}
        {...register("namedScholarshipTitle")}
      />

      <FormFieldError message={errors.namedScholarshipTitle?.message} />
    </div>
  );
}
