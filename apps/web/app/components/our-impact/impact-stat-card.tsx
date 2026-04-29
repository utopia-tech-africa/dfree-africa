"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type ImpactStatCardProps = {
  value: string;
  suffix?: string;
  label: string;
  className?: string;
};

export function ImpactStatCard({
  value,
  suffix = "",
  label,
  className,
}: ImpactStatCardProps) {
  const [displayValue, setDisplayValue] = useState<string>(value);

  const parsed = useMemo(() => parseValueParts(value), [value]);

  useEffect(() => {
    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    const durationMs = 4000;
    const start = performance.now();

    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const current = Math.round(parsed.number * easeOutCubic(progress));
      setDisplayValue(
        `${parsed.prefix}${formatNumber(current)}${parsed.postfix}`,
      );
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [parsed, value]);

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="flex flex-col gap-2 items-start font-bold leading-none">
        <div className="flex items-center font-montserrat text-[38px] text-primary-400 lg:text-[56px]">
          <span className="leading-[49.4px]">{displayValue}</span>
          {suffix && <span className="leading-[49.4px]">{suffix}</span>}
        </div>
        <p className="font-montserrat text-sm text-[#404f4f] lg:text-[18px]">
          {label}
        </p>
      </div>
    </div>
  );
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function parseValueParts(
  raw: string,
): { prefix: string; number: number; postfix: string } | null {
  const trimmed = raw.trim();
  const match = trimmed.match(/^([^0-9]*)([0-9,]+)([^0-9]*)$/);
  if (!match) return null;
  const prefix = match[1] ?? "";
  const numericPart = (match[2] ?? "").replaceAll(",", "");
  const postfix = match[3] ?? "";
  const number = Number(numericPart);
  if (!Number.isFinite(number)) return null;
  return { prefix, number, postfix };
}
