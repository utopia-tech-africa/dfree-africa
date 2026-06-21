"use client";

import { useTranslations } from "next-intl";

import { FormSectionHeading } from "@/components/forms/form-section-heading";

import { CohortSelectionRow } from "./cohort-selection-row";

export function CohortSelectionSection() {
  const t = useTranslations("leadershipInstituteSponsor.step1");

  return (
    <section className="space-y-6">
      <FormSectionHeading
        title={t("chooseCohort")}
        className="text-[26px] font-bold leading-[1.2] md:text-[26px]"
      />
      <CohortSelectionRow />
    </section>
  );
}
