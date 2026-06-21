"use client";

import { useTranslations } from "next-intl";

type SponsorFormHeaderProps = {
  currentStep: number;
};

export function SponsorFormHeader({ currentStep }: SponsorFormHeaderProps) {
  const t = useTranslations("leadershipInstituteSponsor");

  const stepKey =
    currentStep === 1 ? "step1" : currentStep === 2 ? "step2" : "step3";

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-montserrat text-[32px] font-bold leading-[1.2] text-neutral-1000">
        {t(`${stepKey}.title`)}
      </h1>
      {currentStep !== 2 ? (
        <p className="font-poppins text-lg leading-[1.3] text-neutral-900">
          {t(`${stepKey}.subtitle`)}
        </p>
      ) : null}
    </div>
  );
}
