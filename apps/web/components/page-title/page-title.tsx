import { cn } from "@/lib/utils";

type PageTitleProps = {
  text: string;
  className?: string;
};

export function PageTitle({ text, className }: PageTitleProps) {
  return (
    <h2
      className={cn(
        "text-[26px] sm:text-[38px] font-bold text-neutral-1000 font-montserrat",
        className,
      )}
    >
      {text}
    </h2>
  );
}
