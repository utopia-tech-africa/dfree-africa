"use client";

import { CircleMinus, CirclePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import {
  FELLOW_UNIT_PRICE,
  formatSponsorshipCurrency,
  getFellowCount,
  getSponsorshipTotal,
  TIER_FELLOW_COUNTS,
} from "@/lib/fellowship-sponsors/sponsorship-pricing";
import type { LeadershipInstituteSponsorValues } from "@/lib/forms/schemas/leadership-institute-sponsor";
import {
  sponsorshipTierValues,
  type SponsorshipTierValue,
} from "@/lib/forms/schemas/leadership-institute-sponsor";

const MIN_FELLOW_COUNT = 1;
const INITIAL_FELLOW_COUNT = 1;

type DisplayState = {
  fellowCount: number;
  totalAmount: number;
};

const INITIAL_DISPLAY: DisplayState = {
  fellowCount: INITIAL_FELLOW_COUNT,
  totalAmount: INITIAL_FELLOW_COUNT * FELLOW_UNIT_PRICE,
};

function normalizeFellowCount(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(MIN_FELLOW_COUNT, Math.floor(value));
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return Math.max(MIN_FELLOW_COUNT, Math.floor(parsed));
    }
  }

  return INITIAL_FELLOW_COUNT;
}

function resolveTier(value: unknown): SponsorshipTierValue | null {
  if (
    typeof value === "string" &&
    sponsorshipTierValues.includes(value as SponsorshipTierValue)
  ) {
    return value as SponsorshipTierValue;
  }

  return null;
}

function getDisplayState(tier: unknown, customCount: unknown): DisplayState {
  const customFellowCount = normalizeFellowCount(customCount);
  const resolvedTier = resolveTier(tier);
  const fellowCount = resolvedTier
    ? getFellowCount(resolvedTier, customFellowCount)
    : customFellowCount;

  return {
    fellowCount,
    totalAmount: resolvedTier
      ? getSponsorshipTotal(resolvedTier, customFellowCount)
      : fellowCount * FELLOW_UNIT_PRICE,
  };
}

export function CustomFellowCountSelector() {
  const t = useTranslations("leadershipInstituteSponsor.step1");
  const {
    setValue,
    getValues,
    subscribe,
    formState: { isSubmitting },
  } = useFormContext<LeadershipInstituteSponsorValues>();
  const [display, setDisplay] = useState<DisplayState>(INITIAL_DISPLAY);

  const syncDisplay = useCallback(() => {
    setDisplay(
      getDisplayState(
        getValues("sponsorshipTier"),
        getValues("customFellowCount"),
      ),
    );
  }, [getValues]);

  useEffect(() => {
    syncDisplay();

    return subscribe({
      formState: { values: true },
      callback: syncDisplay,
    });
  }, [subscribe, syncDisplay]);

  const fellowCount = normalizeFellowCount(display.fellowCount);
  const totalAmount = Number.isFinite(display.totalAmount)
    ? display.totalAmount
    : fellowCount * FELLOW_UNIT_PRICE;
  const isDecreaseDisabled = isSubmitting || fellowCount <= MIN_FELLOW_COUNT;

  const handleAdjust = (delta: number) => {
    const nextCount = Math.max(MIN_FELLOW_COUNT, fellowCount + delta);
    setValue("customFellowCount", nextCount, { shouldValidate: true });
    setValue(
      "sponsorshipTier",
      nextCount === TIER_FELLOW_COUNTS.community ? "community" : "custom",
      { shouldValidate: true },
    );
  };

  return (
    <div className="space-y-3">
      <p className="font-montserrat text-lg font-bold leading-[1.2] text-neutral-1000">
        {t("customNumber")}
      </p>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-[55px]">
        <div className="flex w-fit items-center rounded-full border border-neutral-300 bg-white px-3 py-2">
          <button
            type="button"
            {...(isDecreaseDisabled ? { disabled: true } : {})}
            onClick={() => handleAdjust(-1)}
            aria-label={t("decreaseFellows")}
            className="shrink-0 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CircleMinus className="size-8 fill-primary-500 text-white" />
          </button>

          <p className="px-[50px] text-center font-poppins text-base leading-[1.2] text-neutral-900">
            {t("fellowCount", { count: fellowCount })}
          </p>

          <button
            type="button"
            {...(isSubmitting ? { disabled: true } : {})}
            onClick={() => handleAdjust(1)}
            aria-label={t("increaseFellows")}
            className="shrink-0 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CirclePlus className="size-8 fill-primary-500 text-white" />
          </button>
        </div>

        <p className="flex shrink-0 flex-wrap items-center gap-4 font-poppins text-base leading-[1.2]">
          <span className="text-neutral-900">{t("totalCommitmentLabel")}</span>
          <span className="font-montserrat text-[32px] font-bold leading-[1.2] text-primary-500">
            {formatSponsorshipCurrency(totalAmount)}
          </span>
        </p>
      </div>
    </div>
  );
}
