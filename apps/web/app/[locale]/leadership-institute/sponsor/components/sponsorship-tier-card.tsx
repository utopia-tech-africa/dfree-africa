"use client";

import { useTranslations } from "next-intl";

import type { PresetSponsorshipTierValue } from "@/lib/forms/schemas/leadership-institute-sponsor";
import { cn } from "@/lib/utils";

type SponsorshipTierCardProps = {
  tier: PresetSponsorshipTierValue;
  isSelected: boolean;
  disabled?: boolean;
  onSelect: () => void;
  onBlur: () => void;
};

const tierNameClassName =
  "bg-gradient-to-br from-[#2F3F1E] to-[#7BA54F] bg-clip-text font-montserrat text-lg font-bold leading-[1.2] text-transparent";

export function SponsorshipTierCard({
  tier,
  isSelected,
  disabled = false,
  onSelect,
  onBlur,
}: SponsorshipTierCardProps) {
  const t = useTranslations(
    "leadershipInstituteSponsor.options.sponsorshipTier",
  );
  const showBadge = tier === "legacy";

  return (
    <button
      type="button"
      {...(disabled ? { disabled: true } : {})}
      onClick={onSelect}
      onBlur={onBlur}
      aria-pressed={isSelected ? "true" : "false"}
      className={cn(
        "relative flex w-full flex-col overflow-visible rounded-xl bg-primary-100/20 p-2 text-left transition-shadow",
        isSelected && "shadow-[0_0_5px_5px_rgba(107,144,68,0.5)]",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
      )}
    >
      <div className="relative flex flex-1 flex-col gap-3 overflow-visible rounded-lg border border-neutral-300 bg-white p-6">
        <p className={tierNameClassName}>{t(`${tier}.name`)}</p>

        <div className="flex flex-col gap-1">
          <p className="font-montserrat text-[32px] font-bold leading-[1.2] text-neutral-1000">
            {t(`${tier}.amount`)}
          </p>
          <p className="font-poppins text-base leading-[1.2] text-neutral-900">
            {t(`${tier}.fellows`)}
          </p>
        </div>

        <p className="font-poppins text-base leading-[1.2] text-neutral-900">
          {t(`${tier}.description`)}
        </p>

        {showBadge ? (
          <div
            className="pointer-events-none absolute right-0 top-0 h-20 w-28 overflow-hidden rounded-tr-lg"
            aria-hidden
          >
            <span className="absolute -left-1 top-6 inline-flex w-[120px] origin-center rotate-[40deg] items-center justify-center whitespace-nowrap bg-tertiary-500 px-2 py-0.5 font-poppins text-[10px] leading-none text-white">
              {t(`${tier}.badge`)}
            </span>
          </div>
        ) : null}
      </div>
    </button>
  );
}
