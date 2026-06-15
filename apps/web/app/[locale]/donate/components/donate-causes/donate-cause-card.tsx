import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InViewVideo } from "@/components/in-view-video";
import { cn } from "@/lib/utils";
import type { DonateCause } from "../../data/causes";

type DonateCauseCardProps = {
  cause: DonateCause;
  className?: string;
};

function formatGoalAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function DonateCauseCard({ cause, className }: DonateCauseCardProps) {
  const {
    title,
    description,
    country,
    previewMedia,
    isOngoing,
    progressPercent,
    goalAmount,
    goalAchieved,
  } = cause;

  return (
    <div
      className={cn(
        "relative h-130 w-full max-w-140 overflow-hidden rounded-lg",
        className,
      )}
    >
      {isOngoing && (
        <div className="absolute left-4 top-4 z-10">
          <Button
            variant="secondary"
            className="rounded-sm p-2 text-sm font-bold uppercase tracking-wide text-primary-500 ring-2 ring-primary-100"
          >
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-500 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-500/50" />
            </span>
            Ongoing
          </Button>
        </div>
      )}

      {previewMedia.type === "image" ? (
        <Image
          src={previewMedia.url}
          alt={title}
          width={400}
          height={600}
          sizes="(max-width: 768px) 100vw, 405px"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <InViewVideo
          src={previewMedia.url}
          muted
          loop
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bottom-0 top-auto h-3/5 bg-linear-to-t from-black via-black/70 to-transparent" />

      <div className="absolute right-4 top-4 z-10">
        <Button className="p-3">{country}</Button>
      </div>

      <div className="absolute bottom-0 z-10 flex h-[65%] flex-col justify-end gap-2 p-6 text-white">
        <h3 className="font-montserrat text-xl font-bold leading-6 tracking-wide">
          {title}
        </h3>

        <p className="line-clamp-3 text-base leading-5 text-white/90">
          {description}
        </p>

        <div className="relative mt-2 h-6 w-full overflow-hidden rounded-full bg-white">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-primary-400"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          >
            <span className="absolute inset-0 flex items-center justify-end pr-3 font-poppins text-sm  text-white">
              {progressPercent}% raised
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-4">
          {goalAchieved ? (
            <p className="font-montserrat text-lg font-bold">Goal achieved!</p>
          ) : (
            <Button className="px-5 py-2.5 tracking-wide">Give to cause</Button>
          )}

          <p className="shrink-0 font-montserrat text-lg font-bold">
            {formatGoalAmount(goalAmount)} Goal
          </p>
        </div>
      </div>
    </div>
  );
}
