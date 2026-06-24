import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { formFieldGroupClassName } from "./form-field-styles";

export { formFieldGroupClassName };

type FormFieldLabelProps = {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function FormFieldLabel({
  htmlFor,
  required = false,
  children,
  className,
}: FormFieldLabelProps) {
  return (
    <Label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium text-neutral-1000 font-poppins",
        className,
      )}
    >
      {children}
      {required ? <span className="text-tertiary-500"> *</span> : null}
    </Label>
  );
}
