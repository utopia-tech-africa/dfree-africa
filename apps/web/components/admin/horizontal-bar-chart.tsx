import { cn } from "@/lib/utils";

export type HorizontalBarChartItem = {
  id: string;
  label: string;
  sublabel?: string;
  value: number;
};

type HorizontalBarChartProps = {
  items: HorizontalBarChartItem[];
  className?: string;
  barClassName?: string;
  emptyMessage?: string;
};

export function HorizontalBarChart({
  items,
  className,
  barClassName,
  emptyMessage = "No data yet",
}: HorizontalBarChartProps) {
  const maxValue = Math.max(1, ...items.map((item) => item.value));
  const hasData = items.some((item) => item.value > 0);

  if (!hasData) {
    return (
      <p className="rounded-lg border border-dashed border-neutral-200 bg-neutral-50/80 px-4 py-8 text-center text-sm text-neutral-700">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => {
        const widthPercent = Math.round((item.value / maxValue) * 100);

        return (
          <li key={item.id} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <div className="min-w-0">
                <p className="truncate font-medium text-neutral-1000">
                  {item.label}
                </p>
                {item.sublabel ? (
                  <p className="truncate text-xs text-neutral-700">
                    {item.sublabel}
                  </p>
                ) : null}
              </div>
              <span className="shrink-0 font-space-grotesk text-sm font-semibold tabular-nums text-primary-700">
                {item.value}
              </span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-neutral-200"
              role="presentation"
            >
              <div
                className={cn(
                  "h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-500 transition-[width] duration-500 ease-out",
                  barClassName,
                )}
                style={{ width: `${widthPercent}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
