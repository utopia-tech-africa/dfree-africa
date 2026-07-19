"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import ComponentLayout from "@/components/component-layout";
import {
  defaultSponsorValues,
  leadershipInstituteSponsorSchema,
  type LeadershipInstituteSponsorValues,
} from "@/lib/forms/schemas/leadership-institute-sponsor";
import {
  SPONSOR_TOTAL_STEPS,
  sponsorCertificationFields,
  sponsorStepFieldMap,
} from "@/lib/forms/leadership-institute-sponsor-steps";
import { startFellowshipSponsorCheckout } from "@/lib/forms/start-fellowship-sponsor-checkout";
import { submitFellowshipSponsor } from "@/lib/forms/submit-fellowship-sponsor";
import { cn } from "@/lib/utils";

import { SponsorCertificationModal } from "./components/sponsor-certification-modal";
import { SponsorFormActions } from "./components/sponsor-form-actions";
import { SponsorFormHeader } from "./components/sponsor-form-header";
import { SponsorStepper } from "./components/sponsor-stepper";
import { SponsorSuccessModal } from "./components/sponsor-success-modal";
import { StepRecognitionPayment } from "./components/step-recognition-payment";
import { StepSponsorInformation } from "./components/step-sponsor-information";
import { StepSponsorshipDetails } from "./components/step-sponsorship-details";

function LeadershipInstituteSponsorFormInner() {
  const t = useTranslations("leadershipInstituteSponsor");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] =
    useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [checkoutNotice, setCheckoutNotice] = useState<string | null>(null);
  const [recognitionLogoFile, setRecognitionLogoFile] = useState<File | null>(
    null,
  );
  const [logoError, setLogoError] = useState<string | null>(null);

  const methods = useForm<LeadershipInstituteSponsorValues>({
    resolver: zodResolver(leadershipInstituteSponsorSchema),
    defaultValues: defaultSponsorValues,
    mode: "onSubmit",
    shouldUnregister: false,
  });

  const { trigger, getValues } = methods;

  useEffect(() => {
    const checkout = searchParams.get("checkout");

    if (checkout === "success") {
      setIsSubmitted(true);
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    if (checkout === "cancelled") {
      setCheckoutNotice(t("errors.checkoutCancelled"));
      setCurrentStep(SPONSOR_TOTAL_STEPS);

      const submissionId = searchParams.get("submission_id");
      if (submissionId) {
        void fetch("/api/fellowship-sponsors/checkout/cancel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ submissionId }),
        });
      }

      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams, t]);

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
    setCheckoutNotice(null);
    setIsProcessing(true);

    try {
      if (data.paymentMethod === "credit_card") {
        const result = await startFellowshipSponsorCheckout(data, {
          recognitionLogoFile,
          locale,
        });

        if (!result.success) {
          setSubmitError(
            result.error === "stripe_not_configured"
              ? t("errors.stripeNotConfigured")
              : t("errors.checkoutFailed"),
          );
          return;
        }

        window.location.assign(result.checkoutUrl);
        return;
      }

      const result = await submitFellowshipSponsor(data, recognitionLogoFile);

      if (!result.success) {
        setSubmitError(t("errors.submitFailed"));
        return;
      }

      setIsCertificationModalOpen(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsProcessing(false);
    }
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

    if (logoError) {
      return;
    }

    setSubmitError(null);
    setIsCertificationModalOpen(true);
  };

  const handleCertificationSubmit = async () => {
    const isCertificationValid = await trigger([...sponsorCertificationFields]);

    if (!isCertificationValid) {
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
            currentStep !== 1 ? "w-3/4 max-w-full" : "w-full",
          )}
        >
          <SponsorFormHeader currentStep={currentStep} />

          {checkoutNotice ? (
            <p
              className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
              role="status"
            >
              {checkoutNotice}
            </p>
          ) : null}

          <FormProvider {...methods}>
            <form onSubmit={handleFormSubmit} className="space-y-8" noValidate>
              {currentStep === 1 ? <StepSponsorshipDetails /> : null}
              {currentStep === 2 ? <StepSponsorInformation /> : null}
              {currentStep === 3 ? (
                <StepRecognitionPayment
                  recognitionLogoFile={recognitionLogoFile}
                  logoError={logoError}
                  onRecognitionLogoChange={setRecognitionLogoFile}
                  onLogoValidationError={setLogoError}
                />
              ) : null}

              {submitError && !isCertificationModalOpen ? (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              ) : null}

              <SponsorFormActions
                isSubmitting={isProcessing}
                isLastStep={currentStep === SPONSOR_TOTAL_STEPS}
                onBack={currentStep > 1 ? handleBack : undefined}
              />
            </form>

            {isCertificationModalOpen ? (
              <SponsorCertificationModal
                isSubmitting={isProcessing}
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

export function LeadershipInstituteSponsorForm() {
  return (
    <Suspense fallback={null}>
      <LeadershipInstituteSponsorFormInner />
    </Suspense>
  );
}
