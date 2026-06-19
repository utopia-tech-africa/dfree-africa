"use client";

import { useEffect, useId, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { FormFieldError } from "@/lib/forms/form-field-error";
import { cn } from "@/lib/utils";

import { formFieldClassName } from "./form-field-styles";
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
  inputClassName?: string;
  labelClassName?: string;
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
  inputClassName,
  labelClassName,
}: PhoneInputFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={cn(formFieldGroupClassName, className)}>
      <FormFieldLabel
        htmlFor={id}
        required={required}
        className={labelClassName}
      >
        {label}
      </FormFieldLabel>

      {!isMounted ? (
        <Input
          id={id}
          type="tel"
          value={value}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className={inputClassName}
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
            "[&_.PhoneInputInput]:flex-1 [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-base",
            formFieldClassName,
            "flex items-center gap-2",
            inputClassName,
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
