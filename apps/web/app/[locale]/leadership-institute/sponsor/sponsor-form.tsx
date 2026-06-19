"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import ComponentLayout from "@/components/component-layout";
import { cn } from "@/lib/utils";
import {
  defaultSponsorValues,
  leadershipInstituteSponsorSchema,
  type LeadershipInstituteSponsorValues,
} from "@/lib/forms/schemas/leadership-institute-sponsor";
import {
  SPONSOR_TOTAL_STEPS,
  sponsorStepFieldMap,
} from "@/lib/forms/leadership-institute-sponsor-steps";
import { submitFellowshipSponsor } from "@/lib/forms/submit-fellowship-sponsor";

import { SponsorFormActions } from "./components/sponsor-form-actions";
import { SponsorFormHeader } from "./components/sponsor-form-header";
import { SponsorStepper } from "./components/sponsor-stepper";
import { SponsorSuccessModal } from "./components/sponsor-success-modal";
import { StepRecognitionPayment } from "./components/step-recognition-payment";
import { StepSponsorInformation } from "./components/step-sponsor-information";
import { StepSponsorshipDetails } from "./components/step-sponsorship-details";

export function LeadershipInstituteSponsorForm() {
  const t = useTranslations("leadershipInstituteSponsor");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<LeadershipInstituteSponsorValues>({
    resolver: zodResolver(leadershipInstituteSponsorSchema),
    defaultValues: defaultSponsorValues,
    mode: "onSubmit",
    shouldUnregister: false,
  });

  const {
    trigger,
    getValues,
    formState: { isSubmitting },
  } = methods;

  const handleBack = () => {
    setCurrentStep((step) => Math.max(1, step - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepAdvance = async () => {
    const fields = sponsorStepFieldMap[currentStep - 1];
    if (!fields) {
      return;
    }

    const isValid = await trigger([...fields]);

    if (!isValid) {
      return;
    }

    setCurrentStep((step) => Math.min(SPONSOR_TOTAL_STEPS, step + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: LeadershipInstituteSponsorValues) => {
    setSubmitError(null);

    const result = await submitFellowshipSponsor(data);

    if (!result.success) {
      setSubmitError(t("errors.submitFailed"));
      return;
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentStep < SPONSOR_TOTAL_STEPS) {
      await handleStepAdvance();
      return;
    }

    const isStepValid = await trigger([...sponsorStepFieldMap[2]]);

    if (!isStepValid) {
      return;
    }

    const parsed = leadershipInstituteSponsorSchema.safeParse(getValues());

    if (!parsed.success) {
      setSubmitError(t("errors.submitFailed"));
      return;
    }

    await onSubmit(parsed.data);
  };

  if (isSubmitted) {
    return <SponsorSuccessModal />;
  }

  return (
    <>
      <SponsorStepper currentStep={currentStep} />

      <ComponentLayout className="py-8 md:py-12">
        <div
          className={cn(
            "space-y-8 text-left",
            currentStep === 2 ? "w-3/4 max-w-full" : "w-full",
          )}
        >
          <SponsorFormHeader currentStep={currentStep} />

          <FormProvider {...methods}>
            <form onSubmit={handleFormSubmit} className="space-y-8" noValidate>
              {currentStep === 1 ? <StepSponsorshipDetails /> : null}
              {currentStep === 2 ? <StepSponsorInformation /> : null}
              {currentStep === 3 ? <StepRecognitionPayment /> : null}

              {submitError ? (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}

              <SponsorFormActions
                isSubmitting={isSubmitting}
                isLastStep={currentStep === SPONSOR_TOTAL_STEPS}
                onBack={currentStep > 1 ? handleBack : undefined}
              />
            </form>
          </FormProvider>
        </div>
      </ComponentLayout>
    </>
  );
}
