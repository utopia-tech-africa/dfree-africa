import { Download } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  isLegacyStoredSignature,
  type FellowshipApplicationPayload,
} from "@/lib/fellowship-applications/types";

type SubmissionDetailProps = {
  payload: FellowshipApplicationPayload;
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

function formatList(values: string[]) {
  return values.length ? values.join(", ") : "—";
}

function ReferenceBlock({
  title,
  reference,
}: {
  title: string;
  reference: FellowshipApplicationPayload["reference1"];
}) {
  return (
    <div className="rounded-lg border border-neutral-200 p-4 sm:col-span-2">
      <h3 className="font-medium text-neutral-1000">{title}</h3>
      <dl className="mt-3 grid gap-3 sm:grid-cols-2">
        <DetailField label="Full name" value={reference.fullName} />
        <DetailField label="Relationship" value={reference.relationship} />
        <DetailField label="Email" value={reference.email} />
        <DetailField label="Phone" value={reference.phone} />
        <DetailField
          label="Organization / title"
          value={reference.organizationTitle}
          className="sm:col-span-2"
        />
      </dl>
    </div>
  );
}

export function SubmissionDetail({ payload }: SubmissionDetailProps) {
  const legacySignature = isLegacyStoredSignature(payload.signature)
    ? payload.signature
    : null;
  const signatureDataUrl = legacySignature
    ? `data:${legacySignature.mimeType};base64,${legacySignature.dataBase64}`
    : null;
  const isImageSignature = legacySignature?.mimeType.startsWith("image/");

  return (
    <div className="space-y-8">
      <DetailSection title="About you & your work">
        <DetailField label="First name" value={payload.firstName} />
        <DetailField label="Last name" value={payload.lastName} />
        <DetailField label="Email" value={payload.email} />
        <DetailField label="Phone" value={payload.phone} />
        <DetailField label="City" value={payload.city} />
        <DetailField label="State" value={payload.state} />
        <DetailField
          label="Mailing address"
          value={payload.mailingAddress}
          className="sm:col-span-2"
        />
        <DetailField label="Current role" value={payload.currentRole} />
        <DetailField label="Organization" value={payload.organization} />
        <DetailField
          label="Organization type"
          value={payload.organizationType}
        />
        <DetailField label="Years served" value={payload.yearsServed} />
        <DetailField
          label="Community served"
          value={payload.communityServed}
          className="sm:col-span-2"
        />
        <DetailField
          label="Organization description"
          value={payload.organizationDescription || "—"}
          className="sm:col-span-2"
        />
      </DetailSection>

      <DetailSection title="Community impact">
        <DetailField
          label="Financial literacy experience"
          value={payload.financialLiteracyExperience}
          className="sm:col-span-2"
        />
        <DetailField
          label="Program description"
          value={payload.programDescription || "—"}
          className="sm:col-span-2"
        />
        <DetailField
          label="Community challenges"
          value={payload.communityChallenges}
          className="sm:col-span-2"
        />
        <DetailField
          label="Motivation"
          value={payload.motivation}
          className="sm:col-span-2"
        />
      </DetailSection>

      <DetailSection title="Deployment vision">
        <DetailField
          label="Community story"
          value={payload.communityStory || "—"}
          className="sm:col-span-2"
        />
        <DetailField label="Who to train" value={payload.whoToTrain} />
        <DetailField label="People to reach" value={payload.peopleToReach} />
        <DetailField label="Setting" value={payload.setting} />
        <DetailField
          label="Participation history"
          value={payload.participationHistory}
        />
        <DetailField
          label="Success metrics"
          value={formatList(payload.successMetrics)}
          className="sm:col-span-2"
        />
        <DetailField
          label="Project vision"
          value={payload.projectVision || "—"}
          className="sm:col-span-2"
        />
      </DetailSection>

      <DetailSection title="Review & submit">
        <ReferenceBlock title="Reference 1" reference={payload.reference1} />
        <ReferenceBlock title="Reference 2" reference={payload.reference2} />
        <DetailField label="Cohort term" value={payload.cohortTerm} />
        <DetailField label="Commitment" value={payload.commitment} />
        <DetailField
          label="Scheduling constraints"
          value={payload.schedulingConstraints || "—"}
          className="sm:col-span-2"
        />
        <DetailField
          label="Referral sources"
          value={formatList(payload.referralSources)}
          className="sm:col-span-2"
        />
        <DetailField label="Signature date" value={payload.signatureDate} />
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-neutral-600">Signature</dt>
          <dd className="mt-2 space-y-2">
            {legacySignature ? (
              <>
                <p className="text-sm text-neutral-700">
                  {legacySignature.fileName}
                </p>
                {isImageSignature && signatureDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- admin-only data URL preview
                  <img
                    src={signatureDataUrl}
                    alt="Applicant signature"
                    className="max-h-48 rounded border border-neutral-200 bg-white"
                  />
                ) : signatureDataUrl ? (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={signatureDataUrl}
                      download={legacySignature.fileName}
                      className="inline-flex items-center gap-2"
                    >
                      <Download className="size-4" aria-hidden />
                      Download PDF signature
                    </a>
                  </Button>
                ) : null}
              </>
            ) : (
              <p className="font-medium text-neutral-1000">
                {typeof payload.signature === "string"
                  ? payload.signature
                  : "—"}
              </p>
            )}
          </dd>
        </div>
      </DetailSection>
    </div>
  );
}
