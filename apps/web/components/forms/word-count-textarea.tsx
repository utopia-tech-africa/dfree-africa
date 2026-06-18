"use client";

import { useId } from "react";

import { FormFieldError } from "@/lib/forms/form-field-error";
import { countWords, wordCountMessage } from "@/lib/forms/word-count";
import { cn } from "@/lib/utils";

import { FormFieldLabel, formFieldGroupClassName } from "./form-field-label";

export const applicationFieldClassName =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-1000 placeholder:text-neutral-500 focus-visible:border-primary-500 focus-visible:ring-[3px] focus-visible:ring-primary-500/20 outline-none disabled:opacity-50";

type WordCountTextareaProps = {
  id?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  maxWords: number;
  rows?: number;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function WordCountTextarea({
  id: idProp,
  label,
  required = false,
  placeholder,
  value,
  maxWords,
  rows = 5,
  disabled = false,
  error,
  onChange,
  className,
}: WordCountTextareaProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const wordCount = countWords(value);

  return (
    <div className={cn(formFieldGroupClassName, className)}>
      <FormFieldLabel htmlFor={id} required={required}>
        {label}
      </FormFieldLabel>

      <textarea
        id={id}
        rows={rows}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className={cn(applicationFieldClassName, "min-h-28 resize-y")}
      />

      <div className="flex items-start justify-between gap-4">
        <FormFieldError message={error} />
        <p
          className={cn(
            "ml-auto shrink-0 text-xs text-neutral-600",
            wordCount > maxWords && "text-tertiary-500",
          )}
        >
          {wordCountMessage(wordCount, maxWords)}
        </p>
      </div>
    </div>
  );
}
