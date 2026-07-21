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
  step5Fields,
  type LeadershipInstituteApplicationValues,
} from "@/lib/forms/schemas/leadership-institute-application";
import { trackApplicationSaveExit } from "@/lib/analytics/track-event";
import { getLeadershipInstituteApplicationStepKey } from "@/lib/forms/leadership-institute-application-steps";
import { recordSaveExit } from "@/lib/forms/record-save-exit";
import { submitFellowshipApplication } from "@/lib/forms/submit-fellowship-application";

import {
  ApplicationCertificationModal,
  ApplicationStartModal,
  ApplicationSuccessModal,
  ApplicationStepper,
  FormActions,
  StepAboutYou,
  StepApplicationReview,
  StepCommunityImpact,
  StepDeploymentVision,
  StepReviewSubmit,
} from "./components";

const TOTAL_STEPS = 5;

type ApplicationDraftPayload = {
  currentStep: number;
  values: Partial<LeadershipInstituteApplicationValues>;
};

function clampStep(step: unknown): number {
  if (typeof step !== "number" || !Number.isFinite(step)) {
    return 1;
  }

  return Math.min(TOTAL_STEPS, Math.max(1, Math.floor(step)));
}

function parseApplicationDraft(raw: string): ApplicationDraftPayload | null {
  try {
    const parsed = JSON.parse(raw) as unknown;

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const record = parsed as Record<string, unknown>;

    if (
      "values" in record &&
      record.values &&
      typeof record.values === "object"
    ) {
      return {
        currentStep: clampStep(record.currentStep),
        values: record.values as Partial<LeadershipInstituteApplicationValues>,
      };
    }

    // Legacy drafts stored form values at the top level.
    return {
      currentStep: 1,
      values: record as Partial<LeadershipInstituteApplicationValues>,
    };
  } catch {
    return null;
  }
}

const stepFieldMap = [
  step1Fields,
  step2Fields,
  step3Fields,
  step4Fields,
  step5Fields,
] as const;

export function LeadershipInstituteApplicationForm() {
  const t = useTranslations("leadershipInstituteApplication");
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
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
    const savedDraft = localStorage.getItem(APPLICATION_FORM_STORAGE_KEY);
    if (!savedDraft) {
      return;
    }

    const draft = parseApplicationDraft(savedDraft);

    if (!draft) {
      localStorage.removeItem(APPLICATION_FORM_STORAGE_KEY);
      return;
    }

    reset({
      ...defaultApplicationValues,
      ...draft.values,
      signature: "",
    });
    setCurrentStep(draft.currentStep);
    setHasStarted(true);
  }, [reset]);

  const saveDraft = (step = currentStep) => {
    const payload: ApplicationDraftPayload = {
      currentStep: step,
      values: {
        ...getValues(),
        signature: "",
      },
    };
    localStorage.setItem(APPLICATION_FORM_STORAGE_KEY, JSON.stringify(payload));
  };

  const goToStep = (step: number) => {
    const nextStep = clampStep(step);
    setCurrentStep(nextStep);
    saveDraft(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    goToStep(currentStep - 1);
  };

  const handleStepAdvance = async () => {
    const fields = stepFieldMap[currentStep - 1];
    if (!fields) {
      return;
    }

    if (fields.length > 0) {
      const isValid = await trigger([...fields]);

      if (!isValid) {
        return;
      }
    }

    goToStep(currentStep + 1);
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
      {!hasStarted ? (
        <ApplicationStartModal
          onStart={() => setHasStarted(true)}
          onClose={() => router.push("/leadership-institute")}
        />
      ) : null}

      <ApplicationStepper currentStep={currentStep} />

      <ComponentLayout className="py-8 md:py-12">
        <div className="w-full max-w-4xl space-y-8 text-left">
          <FormProvider {...methods}>
            <form onSubmit={handleFormSubmit} className="space-y-8" noValidate>
              <div className="space-y-8">
                {currentStep === 1 ? <StepAboutYou /> : null}
                {currentStep === 2 ? <StepCommunityImpact /> : null}
                {currentStep === 3 ? <StepDeploymentVision /> : null}
                {currentStep === 4 ? <StepReviewSubmit /> : null}
                {currentStep === 5 ? (
                  <StepApplicationReview onEditStep={goToStep} />
                ) : null}
              </div>

              {submitError && !isCertificationModalOpen ? (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}

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
