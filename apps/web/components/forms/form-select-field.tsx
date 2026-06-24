"use client";

import { useId } from "react";

import { FormFieldError } from "@/lib/forms/form-field-error";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FormFieldLabel } from "./form-field-label";
import {
  formFieldGroupClassName,
  formSelectTriggerClassName,
} from "./form-field-styles";

export type FormSelectOption = {
  value: string;
  label: string;
};

type FormSelectFieldProps = {
  id?: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  options: FormSelectOption[];
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
  className?: string;
  triggerClassName?: string;
  labelClassName?: string;
};

export function FormSelectField({
  id: idProp,
  label,
  required = false,
  placeholder,
  value,
  options,
  disabled = false,
  error,
  onChange,
  className,
  triggerClassName,
  labelClassName,
}: FormSelectFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div className={cn(formFieldGroupClassName, className)}>
      <FormFieldLabel
        htmlFor={id}
        required={required}
        className={labelClassName}
      >
        {label}
      </FormFieldLabel>

      <Select
        value={value || undefined}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger
          id={id}
          aria-invalid={Boolean(error)}
          className={cn("w-full", formSelectTriggerClassName, triggerClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <FormFieldError message={error} />
    </div>
  );
}
