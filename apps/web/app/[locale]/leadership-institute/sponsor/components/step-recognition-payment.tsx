"use client";

import { RecognitionMaterialsFields } from "./recognition-materials-fields";
import { RecognitionOptionsGrid } from "./recognition-options-grid";
import { PaymentMethodSection } from "./payment-method-section";

type StepRecognitionPaymentProps = {
  recognitionLogoFile: File | null;
  logoError: string | null;
  onRecognitionLogoChange: (file: File | null) => void;
  onLogoValidationError: (message: string | null) => void;
};

export function StepRecognitionPayment({
  recognitionLogoFile,
  logoError,
  onRecognitionLogoChange,
  onLogoValidationError,
}: StepRecognitionPaymentProps) {
  return (
    <div className="space-y-10">
      <RecognitionOptionsGrid />
      <RecognitionMaterialsFields
        recognitionLogoFile={recognitionLogoFile}
        logoError={logoError}
        onRecognitionLogoChange={onRecognitionLogoChange}
        onLogoValidationError={onLogoValidationError}
      />
      <PaymentMethodSection />
    </div>
  );
}
