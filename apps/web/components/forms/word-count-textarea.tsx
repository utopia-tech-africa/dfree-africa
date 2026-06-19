"use client";

import { useId } from "react";

import { Textarea } from "@/components/ui/textarea";
import { FormFieldError } from "@/lib/forms/form-field-error";
import { countWords, wordCountMessage } from "@/lib/forms/word-count";
import { cn } from "@/lib/utils";

import { FormFieldLabel, formFieldGroupClassName } from "./form-field-label";
import { formLongTextareaClassName } from "./form-field-styles";

export type FormTextareaVariant = "default" | "long";

type WordCountTextareaProps = {
  id?: string;
  label: React.ReactNode;
  required?: boolean;
  placeholder?: string;
  value: string;
  maxWords: number;
  variant?: FormTextareaVariant;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  wordCountClassName?: string;
};

export function WordCountTextarea({
  id: idProp,
  label,
  required = false,
  placeholder,
  value,
  maxWords,
  variant = "default",
  disabled = false,
  error,
  onChange,
  onBlur,
  className,
  textareaClassName,
  labelClassName,
  wordCountClassName,
}: WordCountTextareaProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const wordCount = countWords(value);

  return (
    <div className={cn(formFieldGroupClassName, className)}>
      <FormFieldLabel
        htmlFor={id}
        required={required}
        className={labelClassName}
      >
        {label}
      </FormFieldLabel>

      <Textarea
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(
          variant === "long" && formLongTextareaClassName,
          textareaClassName,
        )}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
      />

      <div className="flex items-start justify-between gap-4">
        <FormFieldError message={error} />
        <p
          className={cn(
            "ml-auto shrink-0 text-xs text-neutral-600",
            wordCountClassName,
            wordCount > maxWords && "text-tertiary-500",
          )}
        >
          {wordCountMessage(wordCount, maxWords)}
        </p>
      </div>
    </div>
  );
}
