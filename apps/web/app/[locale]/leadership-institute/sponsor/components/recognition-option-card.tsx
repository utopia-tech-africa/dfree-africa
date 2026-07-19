"use client";

import { useTranslations } from "next-intl";

import type { RecognitionPreferenceValue } from "@/lib/forms/schemas/leadership-institute-sponsor";
import { cn } from "@/lib/utils";

type RecognitionOptionCardProps = {
  value: RecognitionPreferenceValue;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export function RecognitionOptionCard({
  value,
  checked,
  disabled = false,
  onChange,
}: RecognitionOptionCardProps) {
  const t = useTranslations(
    "leadershipInstituteSponsor.step3.recognitionOptions",
  );

  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border border-neutral-300 bg-white p-6 shadow-[0px_0px_7.2px_1px_rgba(0,0,0,0.1)] transition-shadow",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className="mt-1 size-4 shrink-0 rounded accent-primary-500"
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="flex min-w-0 flex-col gap-1">
        <span className="font-poppins text-base font-semibold leading-[1.3] text-neutral-1000">
          {t(`${value}.title`)}
        </span>
        <span className="font-poppins text-sm leading-[1.4] text-neutral-700">
          {t(`${value}.description`)}
        </span>
      </span>
    </label>
  );
}
