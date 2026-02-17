import { cn } from "@/lib/utils";

type SubtitleProps = {
  text: string;
  className?: string;
};

export function Subtitle({ text, className }: SubtitleProps) {
  return (
    <h2 className={cn("text-[32px] font-bold text-neutral-1000", className)}>
      {text}
    </h2>
  );
}
