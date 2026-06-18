import { cn } from "@/lib/utils";

type FormSectionHeadingProps = {
  title: string;
  className?: string;
};

export function FormSectionHeading({
  title,
  className,
}: FormSectionHeadingProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-neutral-1000 font-montserrat",
        className,
      )}
    >
      {title}
    </h3>
  );
}
