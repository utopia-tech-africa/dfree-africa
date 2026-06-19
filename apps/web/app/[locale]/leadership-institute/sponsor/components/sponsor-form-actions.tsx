"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

type SponsorFormActionsProps = {
  isSubmitting?: boolean;
  isLastStep?: boolean;
  onBack?: () => void;
};

export function SponsorFormActions({
  isSubmitting = false,
  isLastStep = false,
  onBack,
}: SponsorFormActionsProps) {
  const t = useTranslations("leadershipInstituteSponsor.actions");

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
        type="submit"
        className="w-full px-5 sm:w-fit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "…" : isLastStep ? t("submit") : t("continue")}
      </Button>
    </div>
  );
}
