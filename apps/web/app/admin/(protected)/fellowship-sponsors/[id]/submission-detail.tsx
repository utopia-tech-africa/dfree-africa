import type { ReactNode } from "react";

import { formatSponsorCohort } from "@/lib/fellowship-sponsors/format-cohort";
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
        {payload.message ? (
          <DetailField
            label="Message"
            value={payload.message}
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
