"use client";

import { useMemo } from "react";

import { FormFieldError } from "@/lib/forms/form-field-error";
import { cn } from "@/lib/utils";

import { FormFieldLabel, formFieldGroupClassName } from "./form-field-label";

export const PEOPLE_TO_REACH_MIN = 10;
export const PEOPLE_TO_REACH_MAX = 500;
export const PEOPLE_TO_REACH_STEP = 10;
export const PEOPLE_TO_REACH_DEFAULT = 140;

type RangeSliderFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  error?: string;
  onChange: (value: number) => void;
};

export function RangeSliderField({
  id,
  label,
  required = false,
  value,
  min = PEOPLE_TO_REACH_MIN,
  max = PEOPLE_TO_REACH_MAX,
  step = PEOPLE_TO_REACH_STEP,
  disabled = false,
  error,
  onChange,
}: RangeSliderFieldProps) {
  const percent = useMemo(
    () => ((value - min) / (max - min)) * 100,
    [value, min, max],
  );

  return (
    <div className={formFieldGroupClassName}>
      <FormFieldLabel htmlFor={id} required={required}>
        {label}
      </FormFieldLabel>

      <div className="relative pt-10">
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2"
          style={{ left: `${percent}%` }}
          aria-hidden
        >
          <div className="relative rounded-md bg-white px-3 py-1.5 text-sm font-medium text-neutral-1000 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            {value}
            <span className="absolute left-1/2 top-full size-0 -translate-x-1/2 border-x-[6px] border-t-[6px] border-x-transparent border-t-white" />
          </div>
        </div>

        <div className="relative flex h-5 items-center">
          <div
            className="pointer-events-none absolute inset-x-0 h-1.5 rounded-full bg-neutral-200"
            aria-hidden
          >
            <div
              className="h-full rounded-full bg-primary-500"
              style={{ width: `${percent}%` }}
            />
          </div>

          <input
            id={id}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={(event) => onChange(Number(event.target.value))}
            className={cn(
              "relative z-10 h-5 w-full cursor-pointer appearance-none bg-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:bg-transparent",
              "[&::-webkit-slider-thumb]:-mt-[7px] [&::-webkit-slider-thumb]:size-5",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.18)]",
              "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent",
              "[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white",
              "[&::-moz-range-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.18)]",
            )}
          />
        </div>
      </div>

      <FormFieldError message={error} />
    </div>
  );
}
