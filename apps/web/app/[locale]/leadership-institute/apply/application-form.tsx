"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import ComponentLayout from "@/components/component-layout";
import { useRouter } from "@/i18n/navigation";
import {
  APPLICATION_FORM_STORAGE_KEY,
  certificationFields,
  defaultApplicationValues,
  leadershipInstituteApplicationSchema,
  step1Fields,
  step2Fields,
  step3Fields,
  step4Fields,
  type LeadershipInstituteApplicationValues,
} from "@/lib/forms/schemas/leadership-institute-application";
import { trackApplicationSaveExit } from "@/lib/analytics/track-event";
import { getLeadershipInstituteApplicationStepKey } from "@/lib/forms/leadership-institute-application-steps";
import { recordSaveExit } from "@/lib/forms/record-save-exit";
import { submitFellowshipApplication } from "@/lib/forms/submit-fellowship-application";

import {
  ApplicationCertificationModal,
  ApplicationSuccessModal,
  ApplicationStepper,
  FormActions,
  StepAboutYou,
  StepCommunityImpact,
  StepDeploymentVision,
  StepReviewSubmit,
} from "./components";

const TOTAL_STEPS = 4;

const stepFieldMap = [
  step1Fields,
  step2Fields,
  step3Fields,
  step4Fields,
] as const;

export function LeadershipInstituteApplicationForm() {
  const t = useTranslations("leadershipInstituteApplication");
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] =
    useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const methods = useForm<LeadershipInstituteApplicationValues>({
    resolver: zodResolver(leadershipInstituteApplicationSchema),
    defaultValues: defaultApplicationValues,
    mode: "onSubmit",
    shouldUnregister: false,
  });

  const {
    trigger,
    getValues,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(APPLICATION_FORM_STORAGE_KEY);
      if (!savedDraft) {
        return;
      }

      const parsed = JSON.parse(
        savedDraft,
      ) as Partial<LeadershipInstituteApplicationValues>;
      reset({
        ...defaultApplicationValues,
        ...parsed,
        signature: null,
      });
    } catch {
      localStorage.removeItem(APPLICATION_FORM_STORAGE_KEY);
    }
  }, [reset]);

  const saveDraft = () => {
    const { signature: _signature, ...draft } = getValues();
    localStorage.setItem(APPLICATION_FORM_STORAGE_KEY, JSON.stringify(draft));
  };

  const handleSaveExit = () => {
    const stepKey = getLeadershipInstituteApplicationStepKey(currentStep);

    if (!stepKey) {
      return;
    }

    saveDraft();
    void recordSaveExit({ step: currentStep, stepKey });
    trackApplicationSaveExit(currentStep, stepKey);
    router.push("/leadership-institute");
  };

  const handleBack = () => {
    setCurrentStep((step) => Math.max(1, step - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepAdvance = async () => {
    const fields = stepFieldMap[currentStep - 1];
    if (!fields) {
      return;
    }

    const isValid = await trigger([...fields]);

    if (!isValid) {
      return;
    }

    saveDraft();
    setCurrentStep((step) => Math.min(TOTAL_STEPS, step + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: LeadershipInstituteApplicationValues) => {
    setSubmitError(null);

    const result = await submitFellowshipApplication(data);

    if (!result.success) {
      setSubmitError(t("errors.submitFailed"));
      return;
    }

    localStorage.removeItem(APPLICATION_FORM_STORAGE_KEY);
    setIsCertificationModalOpen(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentStep < TOTAL_STEPS) {
      await handleStepAdvance();
      return;
    }

    const isStepValid = await trigger([...step4Fields]);

    if (!isStepValid) {
      return;
    }

    setSubmitError(null);
    setIsCertificationModalOpen(true);
  };

  const handleCertificationSubmit = async () => {
    const isCertificationValid = await trigger([...certificationFields]);

    if (!isCertificationValid) {
      return;
    }

    const parsed = leadershipInstituteApplicationSchema.safeParse(getValues());

    if (!parsed.success) {
      setSubmitError(t("errors.submitFailed"));
      return;
    }

    setIsSaving(true);
    setSubmitError(null);

    try {
      await onSubmit(parsed.data);
    } catch {
      setSubmitError(t("errors.submitFailed"));
    } finally {
      setIsSaving(false);
    }
  };

  if (isSubmitted) {
    return <ApplicationSuccessModal />;
  }

  return (
    <>
      <ApplicationStepper currentStep={currentStep} />

      <ComponentLayout className="py-8 md:py-12">
        <div className="w-full max-w-4xl space-y-8 text-left">
          <FormProvider {...methods}>
            <form onSubmit={handleFormSubmit} noValidate>
              <div className="space-y-8">
                {currentStep === 1 ? <StepAboutYou /> : null}
                {currentStep === 2 ? <StepCommunityImpact /> : null}
                {currentStep === 3 ? <StepDeploymentVision /> : null}
                {currentStep === 4 ? <StepReviewSubmit /> : null}
              </div>

              <FormActions
                isSubmitting={isSubmitting || isSaving}
                isLastStep={currentStep === TOTAL_STEPS}
                saveExitStep={currentStep}
                saveExitStepKey={
                  getLeadershipInstituteApplicationStepKey(currentStep) ?? ""
                }
                onSaveExit={handleSaveExit}
                onBack={currentStep > 1 ? handleBack : undefined}
              />
            </form>

            {isCertificationModalOpen ? (
              <ApplicationCertificationModal
                isSubmitting={isSaving}
                submitError={submitError}
                onClose={() => {
                  setSubmitError(null);
                  setIsCertificationModalOpen(false);
                }}
                onSubmit={handleCertificationSubmit}
              />
            ) : null}
          </FormProvider>
        </div>
      </ComponentLayout>
    </>
  );
}
