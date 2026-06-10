type FormFieldErrorProps = {
  message?: string;
  className?: string;
};

export function FormFieldError({ message, className }: FormFieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className={className ?? "text-sm text-tertiary-500"} role="alert">
      {message}
    </p>
  );
}
