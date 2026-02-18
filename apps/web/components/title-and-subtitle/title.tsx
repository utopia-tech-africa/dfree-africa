import { cn } from "@/lib/utils";

type TitleProps = {
  text: string;
  className?: string;
};

export function Title({ text, className }: TitleProps) {
  return (
    <h3 className={cn("text-base font-bold text-tertiary-600", className)}>
      {text}
    </h3>
  );
}
