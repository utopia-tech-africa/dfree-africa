import { Handshake } from "lucide-react";

import { cn } from "@/lib/utils";

type FellowshipSponsorsEmptyStateProps = {
  variant?: "default" | "compact";
  className?: string;
};

export function FellowshipSponsorsEmptyState({
  variant = "default",
  className,
}: FellowshipSponsorsEmptyStateProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50/80 text-center",
        isCompact ? "px-4 py-8" : "px-6 py-12",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full border border-primary-200/60 bg-primary-100/50 shadow-sm",
          isCompact ? "size-14" : "size-20",
        )}
      >
        <Handshake
          className={cn("text-primary-500", isCompact ? "size-7" : "size-10")}
          aria-hidden
        />
      </div>

      <h3
        className={cn(
          "font-space-grotesk font-semibold text-neutral-1000",
          isCompact ? "mt-4 text-sm" : "mt-6 text-lg",
        )}
      >
        No sponsor inquiries yet
      </h3>

      <p
        className={cn(
          "text-neutral-700",
          isCompact
            ? "mt-1.5 max-w-xs text-xs leading-relaxed"
            : "mt-2 max-w-md text-sm leading-relaxed",
        )}
      >
        Submissions will appear here once sponsors complete the Leadership
        Institute sponsorship form.
      </p>
    </div>
  );
}
