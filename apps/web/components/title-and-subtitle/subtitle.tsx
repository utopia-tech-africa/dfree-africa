import { cn } from "@/lib/utils";

type SubtitleProps = {
  text: string;
  className?: string;
};

export function Subtitle({ text, className }: SubtitleProps) {
  return (
    <h2
      className={cn(
        "text-[26px] sm:text-[32px] font-bold text-neutral-1000 font-montserrat",
        className,
      )}
    >
      {text}
    </h2>
  );
}
