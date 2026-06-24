"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

import ComponentLayout from "@/components/component-layout";
import { LEADERSHIP_INSTITUTE_SPONSOR_STEPS } from "@/lib/forms/leadership-institute-sponsor-steps";
import { cn } from "@/lib/utils";

type SponsorStepperProps = {
  currentStep: number;
};

export function SponsorStepper({ currentStep }: SponsorStepperProps) {
  const t = useTranslations("leadershipInstituteSponsor.steps");

  return (
    <section className="w-full bg-white">
      <ComponentLayout className="py-5 md:py-6">
        <nav aria-label={t("progressLabel")} className="w-full overflow-x-auto">
          <ol className="flex min-w-max items-center sm:min-w-0 sm:w-full">
            {LEADERSHIP_INSTITUTE_SPONSOR_STEPS.map((stepKey, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep === stepNumber;
              const isUpcoming = currentStep < stepNumber;

              return (
                <Fragment key={stepKey}>
                  <li className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold sm:size-8",
                        isActive && "bg-primary-500 text-white",
                        !isActive &&
                          "border border-neutral-300 bg-white text-neutral-1000",
                      )}
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`${t(stepKey)} (${stepNumber} of ${LEADERSHIP_INSTITUTE_SPONSOR_STEPS.length})`}
                    >
                      <span aria-hidden>{stepNumber}</span>
                    </span>

                    <span
                      className={cn(
                        "whitespace-nowrap text-xs font-semibold font-montserrat sm:text-sm",
                        isUpcoming ? "text-neutral-500" : "text-neutral-700",
                      )}
                    >
                      {t(stepKey)}
                    </span>
                  </li>

                  {index < LEADERSHIP_INSTITUTE_SPONSOR_STEPS.length - 1 ? (
                    <li
                      aria-hidden
                      className="mx-2 flex min-w-4 flex-1 items-center sm:mx-3 md:min-w-8 lg:mx-6"
                    >
                      <span className="h-px w-full bg-neutral-300" />
                    </li>
                  ) : null}
                </Fragment>
              );
            })}
          </ol>
        </nav>
      </ComponentLayout>
    </section>
  );
}
