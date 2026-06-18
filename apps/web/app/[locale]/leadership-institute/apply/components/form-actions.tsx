"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { APPLICATION_SAVE_EXIT_EVENT } from "@/lib/analytics/track-event";

type FormActionsProps = {
  isSubmitting?: boolean;
  isLastStep?: boolean;
  saveExitStep: number;
  saveExitStepKey: string;
  onSaveExit: () => void;
  onBack?: () => void;
};

export function FormActions({
  isSubmitting = false,
  isLastStep = false,
  saveExitStep,
  saveExitStepKey,
  onSaveExit,
  onBack,
}: FormActionsProps) {
  const t = useTranslations("leadershipInstituteApplication.actions");

  return (
    <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
      {onBack ? (
        <Button
          type="button"
          variant="outline"
          className="w-full border-neutral-400 px-5 sm:w-fit"
          disabled={isSubmitting}
          onClick={onBack}
        >
          {t("back")}
        </Button>
      ) : null}

      <Button
        type="button"
        variant="outline"
        className="w-full border-neutral-400 px-5 sm:w-fit"
        disabled={isSubmitting}
        onClick={onSaveExit}
        data-analytics-event={APPLICATION_SAVE_EXIT_EVENT}
        data-analytics-form="leadership_institute"
        data-analytics-step={saveExitStep}
        data-analytics-step-name={saveExitStepKey}
      >
        {t("saveExit")}
      </Button>

      <Button
        type="submit"
        className="w-full px-5 sm:w-fit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "…" : isLastStep ? t("submit") : t("continue")}
      </Button>
    </div>
  );
}
