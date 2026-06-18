"use client";

import { useEffect, useId, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { FormFieldError } from "@/lib/forms/form-field-error";
import { cn } from "@/lib/utils";

import { applicationFieldClassName } from "./word-count-textarea";
import { FormFieldLabel, formFieldGroupClassName } from "./form-field-label";
import { Input } from "@/components/ui/input";

type PhoneInputFieldProps = {
  id?: string;
  label: string;
  required?: boolean;
  value: string;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  className?: string;
};

export function PhoneInputField({
  id: idProp,
  label,
  required = false,
  value,
  disabled = false,
  error,
  onChange,
  className,
}: PhoneInputFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn(formFieldGroupClassName, className)}>
      <FormFieldLabel htmlFor={id} required={required}>
        {label}
      </FormFieldLabel>

      {!isMounted ? (
        <Input
          id={id}
          type="tel"
          value={value}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className={applicationFieldClassName}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : null}

      {isMounted ? (
        <PhoneInput
          id={id}
          international
          defaultCountry="GH"
          value={value}
          disabled={disabled}
          onChange={(nextValue) => onChange(nextValue ?? "")}
          className={cn(
            "[&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-sm",
            applicationFieldClassName,
            "flex items-center gap-2 px-3 py-2",
          )}
          numberInputProps={{
            "aria-invalid": Boolean(error),
          }}
        />
      ) : null}

      <FormFieldError message={error} />
    </div>
  );
}
