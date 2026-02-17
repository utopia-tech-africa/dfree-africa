import { cn } from "@/lib/utils";

type TitleProps = {
  text: string;
  className?: string;
};

export function Title({ text, className }: TitleProps) {
  return (
    <h3 className={cn("text-[16px] font-bold text-tertiary-600", className)}>
      {text}
    </h3>
  );
}
