import { Download } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { formatSponsorCohort } from "@/lib/fellowship-sponsors/format-cohort";
import {
  formatPaymentAmountCents,
  formatPaymentMethod,
  formatPaymentStatus,
} from "@/lib/fellowship-sponsors/format-payment-method";
import { formatRecognitionPreferences } from "@/lib/fellowship-sponsors/format-recognition";
import { formatSponsorReferralSource } from "@/lib/fellowship-sponsors/format-referral-source";
import {
  formatPublicStatementSharing,
  formatSponsorType,
} from "@/lib/fellowship-sponsors/format-sponsor-profile";
import { formatSponsorshipTier } from "@/lib/fellowship-sponsors/format-tier";
import type { FellowshipSponsorPayload } from "@/lib/fellowship-sponsors/types";

type SubmissionDetailProps = {
  payload: FellowshipSponsorPayload;
};

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-space-grotesk text-xl font-semibold text-primary-700">
        {title}
      </h2>
      <dl className="grid gap-4 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

function DetailField({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-sm font-medium text-neutral-600">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-neutral-1000">{value}</dd>
    </div>
  );
}

function RecognitionLogoField({
  logo,
}: {
  logo: NonNullable<FellowshipSponsorPayload["recognitionLogo"]>;
}) {
  const dataUrl = `data:${logo.mimeType};base64,${logo.dataBase64}`;
  const isImage = logo.mimeType.startsWith("image/");

  return (
    <div className="sm:col-span-2">
      <dt className="text-sm font-medium text-neutral-600">Recognition logo</dt>
      <dd className="mt-2 space-y-3">
        <p className="text-neutral-1000">{logo.fileName}</p>
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element -- admin preview of stored base64
          <img
            src={dataUrl}
            alt={`Recognition logo: ${logo.fileName}`}
            className="max-h-48 max-w-full rounded-md border border-neutral-200 bg-white object-contain p-2"
          />
        ) : null}
        <Button asChild variant="outline" size="sm">
          <a href={dataUrl} download={logo.fileName}>
            <Download className="size-4" aria-hidden />
            Download logo
          </a>
        </Button>
      </dd>
    </div>
  );
}

export function SubmissionDetail({ payload }: SubmissionDetailProps) {
  return (
    <div className="space-y-8">
      <DetailSection title="Sponsorship interest">
        <DetailField
          label="Sponsorship level"
          value={formatSponsorshipTier(
            payload.sponsorshipTier,
            payload.customFellowCount,
          )}
          className="sm:col-span-2"
        />
        {payload.namedScholarshipTitle ? (
          <DetailField
            label="Named scholarship / cohort title"
            value={payload.namedScholarshipTitle}
            className="sm:col-span-2"
          />
        ) : null}
        <DetailField
          label="Cohort"
          value={formatSponsorCohort(payload.sponsorCohort)}
          className="sm:col-span-2"
        />
        {payload.cohortAssignmentNotes ? (
          <DetailField
            label="Cohort assignment notes"
            value={payload.cohortAssignmentNotes}
            className="sm:col-span-2"
          />
        ) : null}
      </DetailSection>

      <DetailSection title="Recognition & payment">
        <DetailField
          label="Recognition preferences"
          value={formatRecognitionPreferences(payload.recognitionPreferences)}
          className="sm:col-span-2"
        />
        {payload.recognitionDisplayName ? (
          <DetailField
            label="Name on recognition materials"
            value={payload.recognitionDisplayName}
            className="sm:col-span-2"
          />
        ) : null}
        {payload.recognitionLogo ? (
          <RecognitionLogoField logo={payload.recognitionLogo} />
        ) : null}
        <DetailField
          label="Payment method"
          value={formatPaymentMethod(payload.paymentMethod)}
        />
        {payload.payment ? (
          <>
            <DetailField
              label="Payment status"
              value={formatPaymentStatus(payload.payment.status)}
            />
            <DetailField
              label="Amount"
              value={formatPaymentAmountCents(payload.payment.amountCents)}
            />
            {payload.payment.stripeCheckoutSessionId ? (
              <DetailField
                label="Stripe checkout session"
                value={payload.payment.stripeCheckoutSessionId}
                className="sm:col-span-2"
              />
            ) : null}
            {payload.payment.stripePaymentIntentId ? (
              <DetailField
                label="Stripe payment intent"
                value={payload.payment.stripePaymentIntentId}
                className="sm:col-span-2"
              />
            ) : null}
            {payload.payment.paidAt ? (
              <DetailField
                label="Paid at"
                value={new Date(payload.payment.paidAt).toLocaleString()}
              />
            ) : null}
          </>
        ) : null}
        {payload.checkNumber ? (
          <DetailField label="Check number" value={payload.checkNumber} />
        ) : null}
        {payload.anticipatedWireDate ? (
          <DetailField
            label="Anticipated wire date"
            value={payload.anticipatedWireDate}
          />
        ) : null}
        {payload.invoiceRecipientName ? (
          <DetailField
            label="Invoice recipient name"
            value={payload.invoiceRecipientName}
          />
        ) : null}
        {payload.invoiceEmail ? (
          <DetailField label="Invoice email" value={payload.invoiceEmail} />
        ) : null}
        {payload.purchaseOrderNumber ? (
          <DetailField
            label="Purchase order number"
            value={payload.purchaseOrderNumber}
          />
        ) : null}
        {payload.requestedPaymentDate ? (
          <DetailField
            label="Requested payment date"
            value={payload.requestedPaymentDate}
          />
        ) : null}
        {payload.specialBillingInstructions ? (
          <DetailField
            label="Special billing instructions"
            value={payload.specialBillingInstructions}
            className="sm:col-span-2"
          />
        ) : null}
        {payload.referralSource ? (
          <DetailField
            label="How did you hear about us"
            value={formatSponsorReferralSource(payload.referralSource)}
            className="sm:col-span-2"
          />
        ) : null}
      </DetailSection>

      <DetailSection title="Personal information">
        <DetailField label="First name" value={payload.firstName} />
        <DetailField label="Last name" value={payload.lastName} />
        <DetailField label="Email" value={payload.email} />
        <DetailField label="Phone" value={payload.phone} />
      </DetailSection>

      <DetailSection title="Location">
        <DetailField label="City" value={payload.city} />
        <DetailField label="State" value={payload.state} />
        <DetailField
          label="Mailing address"
          value={payload.mailingAddress}
          className="sm:col-span-2"
        />
      </DetailSection>

      <DetailSection title="Professional information">
        <DetailField label="Current role / title" value={payload.currentRole} />
        <DetailField
          label="Organization or company"
          value={payload.organization}
        />
        {payload.sponsorType ? (
          <DetailField
            label="Sponsor type"
            value={formatSponsorType(payload.sponsorType)}
            className="sm:col-span-2"
          />
        ) : null}
      </DetailSection>

      {payload.sponsorWhy ||
      payload.communitiesToSupport ||
      payload.publicStatementSharing ? (
        <DetailSection title="Your why">
          {payload.sponsorWhy ? (
            <DetailField
              label="Why sponsor DFREE Fellows"
              value={payload.sponsorWhy}
              className="sm:col-span-2"
            />
          ) : null}
          {payload.communitiesToSupport ? (
            <DetailField
              label="Communities to support"
              value={payload.communitiesToSupport}
              className="sm:col-span-2"
            />
          ) : null}
          {payload.publicStatementSharing ? (
            <DetailField
              label="Public statement sharing"
              value={formatPublicStatementSharing(
                payload.publicStatementSharing,
              )}
              className="sm:col-span-2"
            />
          ) : null}
        </DetailSection>
      ) : null}
    </div>
  );
}
