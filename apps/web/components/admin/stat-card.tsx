import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: number | string;
  description: string;
  icon: LucideIcon;
  href?: string;
  hrefLabel?: string;
  highlight?: boolean;
  className?: string;
};

export function StatCard({
  label,
  value,
  description,
  icon: Icon,
  href,
  hrefLabel = "View",
  highlight = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
        highlight ? "border-amber-300 bg-amber-50/50" : "border-neutral-200",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex size-10 items-center justify-center rounded-lg",
            highlight
              ? "bg-amber-100 text-amber-700"
              : "bg-primary-100 text-primary-700",
          )}
        >
          <Icon className="size-5" aria-hidden />
        </div>
        <p className="font-space-grotesk text-3xl font-bold tabular-nums text-primary-700">
          {value}
        </p>
      </div>
      <div>
        <p className="font-medium text-neutral-1000">{label}</p>
        <p className="mt-1 text-sm text-neutral-700">{description}</p>
        {href ? (
          <Link
            href={href}
            className="mt-3 inline-block text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
          >
            {hrefLabel} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
