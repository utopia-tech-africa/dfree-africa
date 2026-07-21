"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormSectionHeading } from "@/components/forms/form-section-heading";
import type { LeadershipInstituteApplicationValues } from "@/lib/forms/schemas/leadership-institute-application";

type StepApplicationReviewProps = {
  onEditStep: (step: number) => void;
};

function ReviewField({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  const display =
    value === null || value === undefined || value === "" ? "—" : String(value);

  return (
    <div>
      <dt className="text-sm font-medium text-neutral-600">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap font-poppins text-base text-neutral-1000">
        {display}
      </dd>
    </div>
  );
}

function ReviewSection({
  title,
  step,
  onEditStep,
  editLabel,
  children,
}: {
  title: string;
  step: number;
  onEditStep: (step: number) => void;
  editLabel: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-xl border border-neutral-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <FormSectionHeading title={title} />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="shrink-0"
          onClick={() => onEditStep(step)}
        >
          {editLabel}
        </Button>
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

export function StepApplicationReview({
  onEditStep,
}: StepApplicationReviewProps) {
  const t = useTranslations("leadershipInstituteApplication");
  const tReview = useTranslations("leadershipInstituteApplication.step5");
  const { control } = useFormContext<LeadershipInstituteApplicationValues>();
  const values = useWatch({ control }) as LeadershipInstituteApplicationValues;

  const optionLabel = (
    step: "step1" | "step2" | "step3" | "step4",
    group: string,
    value: string,
  ) => {
    if (!value) {
      return "—";
    }

    try {
      return t(`${step}.options.${group}.${value}`);
    } catch {
      return value;
    }
  };

  const cohortLabel = (value: string) => {
    if (!value) {
      return "—";
    }

    try {
      return t(`step4.options.cohortTerm.${value}.label`);
    } catch {
      return value;
    }
  };

  const listLabels = (
    step: "step3" | "step4",
    group: string,
    selected: string[] | undefined,
  ) => {
    if (!selected?.length) {
      return "—";
    }

    return selected
      .map((value) => {
        try {
          return t(`${step}.options.${group}.${value}`);
        } catch {
          return value;
        }
      })
      .join(", ");
  };

  const editLabel = tReview("edit");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="font-montserrat text-2xl font-bold text-neutral-1000 md:text-3xl">
          {tReview("title")}
        </h2>
        <p className="text-sm text-neutral-700 md:text-base">
          {tReview("subtitle")}
        </p>
      </div>

      <ReviewSection
        title={t("step1.title")}
        step={1}
        onEditStep={onEditStep}
        editLabel={editLabel}
      >
        <ReviewField
          label={t("step1.fields.firstName")}
          value={values.firstName}
        />
        <ReviewField
          label={t("step1.fields.lastName")}
          value={values.lastName}
        />
        <ReviewField label={t("step1.fields.email")} value={values.email} />
        <ReviewField label={t("step1.fields.phone")} value={values.phone} />
        <ReviewField label={t("step1.fields.city")} value={values.city} />
        <ReviewField label={t("step1.fields.state")} value={values.state} />
        <ReviewField
          label={t("step1.fields.mailingAddress")}
          value={values.mailingAddress}
        />
        <ReviewField
          label={t("step1.fields.currentRole")}
          value={values.currentRole}
        />
        <ReviewField
          label={t("step1.fields.organization")}
          value={values.organization}
        />
        <ReviewField
          label={t("step1.fields.organizationType")}
          value={optionLabel(
            "step1",
            "organizationType",
            values.organizationType,
          )}
        />
        <ReviewField
          label={t("step1.fields.yearsServed")}
          value={optionLabel("step1", "yearsServed", values.yearsServed)}
        />
        <ReviewField
          label={t("step1.fields.communityServed")}
          value={values.communityServed}
        />
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step1.fields.organizationDescription")}
            value={values.organizationDescription}
          />
        </div>
      </ReviewSection>

      <ReviewSection
        title={t("step2.title")}
        step={2}
        onEditStep={onEditStep}
        editLabel={editLabel}
      >
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step2.fields.financialLiteracyExperience")}
            value={optionLabel(
              "step2",
              "financialLiteracyExperience",
              values.financialLiteracyExperience,
            )}
          />
        </div>
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step2.fields.programDescription")}
            value={values.programDescription}
          />
        </div>
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step2.fields.communityChallenges")}
            value={values.communityChallenges}
          />
        </div>
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step2.fields.motivation")}
            value={values.motivation}
          />
        </div>
      </ReviewSection>

      <ReviewSection
        title={t("step3.title")}
        step={3}
        onEditStep={onEditStep}
        editLabel={editLabel}
      >
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step3.fields.communityStory")}
            value={values.communityStory}
          />
        </div>
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step3.fields.whoToTrain")}
            value={values.whoToTrain}
          />
        </div>
        <ReviewField
          label={t("step3.fields.peopleToReach")}
          value={values.peopleToReach}
        />
        <ReviewField
          label={t("step3.fields.setting")}
          value={optionLabel("step3", "setting", values.setting)}
        />
        <ReviewField
          label={t("step3.fields.participationHistory")}
          value={optionLabel(
            "step3",
            "participationHistory",
            values.participationHistory,
          )}
        />
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step3.fields.successMetrics")}
            value={listLabels("step3", "successMetrics", values.successMetrics)}
          />
        </div>
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step3.fields.projectVision")}
            value={values.projectVision}
          />
        </div>
      </ReviewSection>

      <ReviewSection
        title={t("step4.title")}
        step={4}
        onEditStep={onEditStep}
        editLabel={editLabel}
      >
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-semibold text-neutral-800">
            {t("step4.reference1")}
          </p>
          <dl className="grid gap-3 sm:grid-cols-2">
            <ReviewField
              label={t("step4.fields.fullName")}
              value={values.reference1?.fullName}
            />
            <ReviewField
              label={t("step4.fields.relationship")}
              value={values.reference1?.relationship}
            />
            <ReviewField
              label={t("step4.fields.email")}
              value={values.reference1?.email}
            />
            <ReviewField
              label={t("step4.fields.phone")}
              value={values.reference1?.phone}
            />
            <div className="sm:col-span-2">
              <ReviewField
                label={t("step4.fields.organizationTitle")}
                value={values.reference1?.organizationTitle}
              />
            </div>
          </dl>
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-semibold text-neutral-800">
            {t("step4.reference2")}
          </p>
          <dl className="grid gap-3 sm:grid-cols-2">
            <ReviewField
              label={t("step4.fields.fullName")}
              value={values.reference2?.fullName}
            />
            <ReviewField
              label={t("step4.fields.relationship")}
              value={values.reference2?.relationship}
            />
            <ReviewField
              label={t("step4.fields.email")}
              value={values.reference2?.email}
            />
            <ReviewField
              label={t("step4.fields.phone")}
              value={values.reference2?.phone}
            />
            <div className="sm:col-span-2">
              <ReviewField
                label={t("step4.fields.organizationTitle")}
                value={values.reference2?.organizationTitle}
              />
            </div>
          </dl>
        </div>

        <ReviewField
          label={t("step4.fields.cohortTerm")}
          value={cohortLabel(values.cohortTerm)}
        />
        <ReviewField
          label={t("step4.fields.commitment")}
          value={optionLabel("step4", "commitment", values.commitment)}
        />
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step4.fields.schedulingConstraints")}
            value={values.schedulingConstraints}
          />
        </div>
        <div className="sm:col-span-2">
          <ReviewField
            label={t("step4.fields.referralSources")}
            value={listLabels(
              "step4",
              "referralSources",
              values.referralSources,
            )}
          />
        </div>
      </ReviewSection>
    </div>
  );
}
