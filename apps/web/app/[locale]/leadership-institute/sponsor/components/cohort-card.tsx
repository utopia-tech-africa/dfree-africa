"use client";

import { useTranslations } from "next-intl";

import type { SponsorCohortValue } from "@/lib/fellowship-sponsors/sponsor-cohorts";
import { cn } from "@/lib/utils";

type CohortCardProps = {
  cohort: SponsorCohortValue;
  isSelected: boolean;
  disabled?: boolean;
  onSelect: () => void;
  onBlur: () => void;
};

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex w-full items-center justify-between border-t border-neutral-300 pt-1">
      <span className="font-poppins text-sm leading-[1.2] text-neutral-800">
        {label}
      </span>
      <span className="font-poppins text-sm font-medium leading-[1.2] text-neutral-800">
        {value}
      </span>
    </div>
  );
}

export function CohortCard({
  cohort,
  isSelected,
  disabled = false,
  onSelect,
  onBlur,
}: CohortCardProps) {
  const t = useTranslations("leadershipInstituteSponsor.options.cohorts");
  const tFields = useTranslations(
    "leadershipInstituteSponsor.step1.cohortFields",
  );

  return (
    <button
      type="button"
      {...(disabled ? { disabled: true } : {})}
      onClick={onSelect}
      onBlur={onBlur}
      aria-pressed={isSelected ? "true" : "false"}
      className={cn(
        "flex w-full flex-col gap-6 rounded-lg border border-neutral-300 bg-white px-3 py-6 text-left shadow-[0_0_7.2px_1px_rgba(0,0,0,0.1)] transition-shadow",
        isSelected && "shadow-[0_0_5px_5px_rgba(107,144,68,0.5)]",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      )}
    >
      <p className="font-montserrat text-[22px] font-bold leading-[1.2] text-neutral-1000">
        {t(`${cohort}.name`)}
      </p>

      <div className="flex w-full flex-col gap-2">
        <DetailRow
          label={tFields("startDate")}
          value={t(`${cohort}.startDate`)}
        />
        <DetailRow label={tFields("endDate")} value={t(`${cohort}.endDate`)} />
        <DetailRow
          label={tFields("duration")}
          value={t(`${cohort}.duration`)}
        />
        <DetailRow label={tFields("status")} value={t(`${cohort}.status`)} />
      </div>
    </button>
  );
}
