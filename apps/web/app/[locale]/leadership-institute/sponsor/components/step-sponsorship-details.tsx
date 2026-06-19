"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { FormSectionHeading } from "@/components/forms/form-section-heading";

import { CohortAssignmentNotesField } from "./cohort-assignment-notes-field";
import { CohortSelectionSection } from "./cohort-selection-section";
import { NamedScholarshipTitleField } from "./named-scholarship-title-field";
import { SponsorshipTierRow } from "./sponsorship-tier-row";

const CustomFellowCountSelector = dynamic(
  () =>
    import("./custom-fellow-count-selector").then(
      (module) => module.CustomFellowCountSelector,
    ),
  { ssr: false },
);

export function StepSponsorshipDetails() {
  const t = useTranslations("leadershipInstituteSponsor.step1");

  return (
    <section className="space-y-8">
      <div className="space-y-6">
        <FormSectionHeading
          title={t("chooseTier")}
          className="text-[26px] font-bold leading-[1.2] md:text-[26px]"
        />
        <SponsorshipTierRow />
      </div>
      <CustomFellowCountSelector />
      <NamedScholarshipTitleField />
      <div className="pt-8">
        <CohortSelectionSection />
      </div>
      <CohortAssignmentNotesField />
    </section>
  );
}
