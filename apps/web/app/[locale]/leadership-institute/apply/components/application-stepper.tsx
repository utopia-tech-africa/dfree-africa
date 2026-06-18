"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

import ComponentLayout from "@/components/component-layout";
import { LEADERSHIP_INSTITUTE_APPLICATION_STEPS } from "@/lib/forms/leadership-institute-application-steps";
import { cn } from "@/lib/utils";

type ApplicationStepperProps = {
  currentStep: number;
};

export function ApplicationStepper({ currentStep }: ApplicationStepperProps) {
  const t = useTranslations("leadershipInstituteApplication.steps");

  return (
    <ComponentLayout className="py-5 md:py-6">
      <nav aria-label={t("progressLabel")} className="w-full">
        <ol className="flex w-full items-center">
          {LEADERSHIP_INSTITUTE_APPLICATION_STEPS.map((stepKey, index) => {
            const stepNumber = index + 1;
            const isComplete = currentStep > stepNumber;
            const isActive = currentStep === stepNumber;
            const isUpcoming = !isComplete && !isActive;

            return (
              <Fragment key={stepKey}>
                <li className="flex shrink-0 items-center gap-0 md:gap-2">
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                      (isActive || isComplete) && "bg-primary-500 text-white",
                      isUpcoming &&
                        "border border-neutral-300 bg-white text-neutral-1000",
                    )}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`${t(stepKey)} (${stepNumber} of ${LEADERSHIP_INSTITUTE_APPLICATION_STEPS.length})`}
                  >
                    {isComplete ? (
                      <Check className="size-3.5" aria-hidden />
                    ) : (
                      <span aria-hidden>{stepNumber}</span>
                    )}
                  </span>

                  <span
                    className={cn(
                      "hidden whitespace-nowrap text-sm font-semibold font-montserrat md:inline",
                      isUpcoming ? "text-neutral-500" : "text-neutral-700",
                    )}
                  >
                    {t(stepKey)}
                  </span>
                </li>

                {index < LEADERSHIP_INSTITUTE_APPLICATION_STEPS.length - 1 ? (
                  <li
                    aria-hidden
                    className="mx-2 flex min-w-4 flex-1 items-center md:mx-3 md:min-w-6 lg:mx-4"
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
  );
}
