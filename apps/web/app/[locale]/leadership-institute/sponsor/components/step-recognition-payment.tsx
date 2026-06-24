"use client";

import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import {
  FormFieldLabel,
  formFieldGroupClassName,
} from "@/components/forms/form-field-label";
import { FormSectionHeading } from "@/components/forms/form-section-heading";
import { Textarea } from "@/components/ui/textarea";
import { FormFieldError } from "@/lib/forms/form-field-error";
import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";
import {
  sponsorshipTierValues,
  type SponsorshipTierValue,
} from "@/lib/forms/schemas/leadership-institute-sponsor";
import {
  formatSponsorshipAmount,
  formatSponsorshipFellows,
} from "@/lib/fellowship-sponsors/format-tier";
import { sponsorCohortValues } from "@/lib/fellowship-sponsors/sponsor-cohorts";
import type { SponsorCohortValue } from "@/lib/fellowship-sponsors/sponsor-cohorts";

function ReviewItem({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-sm font-medium text-neutral-600">{label}</dt>
      <dd className="mt-1 text-neutral-1000">{value || "—"}</dd>
    </div>
  );
}

export function StepRecognitionPayment() {
  const t = useTranslations("leadershipInstituteSponsor");
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();

  const values = useWatch({ control });

  const sponsorshipTier = sponsorshipTierValues.includes(
    values.sponsorshipTier as SponsorshipTierValue,
  )
    ? (values.sponsorshipTier as SponsorshipTierValue)
    : null;

  const customFellowCount =
    typeof values.customFellowCount === "number" ? values.customFellowCount : 1;

  const tierName = sponsorshipTier
    ? sponsorshipTier === "custom"
      ? t("options.sponsorshipTier.custom.name")
      : t(`options.sponsorshipTier.${sponsorshipTier}.name`)
    : "—";

  const tierAmount = sponsorshipTier
    ? sponsorshipTier === "custom"
      ? formatSponsorshipAmount(sponsorshipTier, customFellowCount)
      : t(`options.sponsorshipTier.${sponsorshipTier}.amount`)
    : "—";

  const tierFellows = sponsorshipTier
    ? sponsorshipTier === "custom"
      ? formatSponsorshipFellows(sponsorshipTier, customFellowCount)
      : t(`options.sponsorshipTier.${sponsorshipTier}.fellows`)
    : "";

  const tierDescription = sponsorshipTier
    ? sponsorshipTier === "custom"
      ? t("options.sponsorshipTier.custom.description")
      : t(`options.sponsorshipTier.${sponsorshipTier}.description`)
    : "";

  const sponsorName =
    `${values.firstName ?? ""} ${values.lastName ?? ""}`.trim();

  const sponsorCohort = sponsorCohortValues.includes(
    values.sponsorCohort as SponsorCohortValue,
  )
    ? (values.sponsorCohort as SponsorCohortValue)
    : null;

  const cohortName = sponsorCohort
    ? t(`options.cohorts.${sponsorCohort}.name`)
    : "—";

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <FormSectionHeading title={t("step3.recognitionTitle")} />
        <p className="text-sm text-neutral-700 md:text-base">
          {t("step3.recognitionDescription")}
        </p>
      </section>

      <section className="space-y-4">
        <FormSectionHeading title={t("step3.paymentTitle")} />
        <p className="text-sm text-neutral-700 md:text-base">
          {t("step3.paymentDescription")}
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5 md:p-6">
        <h3 className="font-montserrat text-lg font-semibold text-neutral-1000">
          {t("step3.summaryTitle")}
        </h3>
        <dl className="grid gap-4 sm:grid-cols-2">
          <ReviewItem label={t("step3.summaryTier")} value={tierName} />
          <ReviewItem label={t("step3.summaryAmount")} value={tierAmount} />
          <ReviewItem
            label={t("step3.summaryFellows")}
            value={tierFellows}
            className="sm:col-span-2"
          />
          <ReviewItem
            label={t("step3.summaryTierDescription")}
            value={tierDescription}
            className="sm:col-span-2"
          />
          {values.namedScholarshipTitle ? (
            <ReviewItem
              label={t("step3.summaryNamedTitle")}
              value={values.namedScholarshipTitle}
              className="sm:col-span-2"
            />
          ) : null}
          <ReviewItem
            label={t("step3.summaryCohort")}
            value={cohortName}
            className="sm:col-span-2"
          />
          {values.cohortAssignmentNotes ? (
            <ReviewItem
              label={t("step3.summaryCohortNotes")}
              value={values.cohortAssignmentNotes}
              className="sm:col-span-2"
            />
          ) : null}
          <ReviewItem label={t("step3.summaryContact")} value={sponsorName} />
          <ReviewItem
            label={t("fields.organization")}
            value={values.organization ?? ""}
          />
          <ReviewItem label={t("fields.email")} value={values.email ?? ""} />
        </dl>
      </section>

      <section className="space-y-4">
        <FormSectionHeading title={t("sections.additionalDetails")} />
        <div className={formFieldGroupClassName}>
          <FormFieldLabel htmlFor="sponsor-message">
            {t("fields.message")}
          </FormFieldLabel>
          <Textarea
            id="sponsor-message"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.message)}
            placeholder={t("placeholders.message")}
            {...register("message")}
          />
          <FormFieldError message={errors.message?.message} />
        </div>
      </section>
    </div>
  );
}
