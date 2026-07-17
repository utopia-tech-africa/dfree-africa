"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import {
  FormFieldLabel,
  formFieldGroupClassName,
} from "@/components/forms/form-field-label";
import { Input } from "@/components/ui/input";
import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";
import { cn } from "@/lib/utils";

import {
  sponsorFieldLabelClassName,
  sponsorFormGridClassName,
  sponsorSectionHeadingClassName,
} from "./sponsor-form-field-styles";
import { LogoFileUploadField } from "./logo-file-upload-field";

type RecognitionMaterialsFieldsProps = {
  recognitionLogoFile: File | null;
  logoError: string | null;
  onRecognitionLogoChange: (file: File | null) => void;
  onLogoValidationError: (message: string | null) => void;
};

export function RecognitionMaterialsFields({
  recognitionLogoFile,
  logoError,
  onRecognitionLogoChange,
  onLogoValidationError,
}: RecognitionMaterialsFieldsProps) {
  const t = useTranslations("leadershipInstituteSponsor.step3");
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  return (
    <section className="space-y-4">
      <h2 className={sponsorSectionHeadingClassName}>
        {t("recognitionMaterialsTitle")}
      </h2>

      <div
        className={cn(
          sponsorFormGridClassName,
          "grid-rows-[auto_1fr] items-start gap-x-6 gap-y-[10px]",
        )}
      >
        <FormFieldLabel
          htmlFor="recognition-display-name"
          className={sponsorFieldLabelClassName}
        >
          {t("recognitionDisplayNameLabel")}
        </FormFieldLabel>

        <LogoFileUploadField
          value={recognitionLogoFile}
          disabled={isSubmitting}
          error={logoError ?? undefined}
          onChange={onRecognitionLogoChange}
          onValidationError={onLogoValidationError}
        />

        <div className={formFieldGroupClassName}>
          <Input
            id="recognition-display-name"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.recognitionDisplayName)}
            className="rounded-full"
            {...register("recognitionDisplayName")}
          />
          <FormFieldError message={errors.recognitionDisplayName?.message} />
        </div>
      </div>
    </section>
  );
}
