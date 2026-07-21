"use client";

import { format, isValid, parseISO } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useId, useState } from "react";

import { DefaultButton } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormFieldError } from "@/lib/forms/form-field-error";
import { cn } from "@/lib/utils";

import { FormFieldLabel } from "./form-field-label";
import {
  formFieldGroupClassName,
  formSelectTriggerClassName,
} from "./form-field-styles";

type FormDateFieldProps = {
  id?: string;
  label: string;
  required?: boolean;
  value: string;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  triggerClassName?: string;
  labelClassName?: string;
};

function parseDateValue(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = parseISO(value);
  return isValid(parsed) ? parsed : undefined;
}

function toDateInputValue(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function FormDateField({
  id: idProp,
  label,
  required = false,
  value,
  disabled = false,
  error,
  placeholder = "dd/mm/yyyy",
  onChange,
  className,
  triggerClassName,
  labelClassName,
}: FormDateFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [open, setOpen] = useState(false);
  const selectedDate = parseDateValue(value);

  return (
    <div className={cn(formFieldGroupClassName, className)}>
      <FormFieldLabel
        htmlFor={id}
        required={required}
        className={labelClassName}
      >
        {label}
      </FormFieldLabel>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <DefaultButton
            id={id}
            type="button"
            variant="outline"
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className={cn(
              "w-full justify-start gap-2 rounded-full font-normal",
              formSelectTriggerClassName,
              !selectedDate && "text-neutral-500",
              triggerClassName,
            )}
          >
            <CalendarDays className="size-5 shrink-0 text-neutral-500" />
            {selectedDate ? format(selectedDate, "dd/MM/yyyy") : placeholder}
          </DefaultButton>
        </PopoverTrigger>
        <PopoverContent
          className="z-[100] w-auto overflow-hidden p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date ? toDateInputValue(date) : "");
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <FormFieldError message={error} />
    </div>
  );
}
