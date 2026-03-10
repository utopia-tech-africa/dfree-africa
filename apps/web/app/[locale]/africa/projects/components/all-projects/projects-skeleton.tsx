import { Skeleton } from "@/components/ui/skeleton";

const CARD_COUNT = 6;

export function ProjectsSkeleton() {
  return (
    <div className="flex flex-col gap-10 my-6">
      <div className="w-full flex justify-end">
        {/* Desktop: label + year pills on the right */}
        <div className="hidden sm:flex justify-end items-center gap-2">
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-9 w-12 rounded-md" />
          <Skeleton className="h-9 w-14 rounded-md" />
          <Skeleton className="h-9 w-14 rounded-md" />
          <Skeleton className="h-9 w-14 rounded-md" />
        </div>
        {/* Mobile: filter button on the right */}
        <Skeleton className="sm:hidden h-9 w-20 rounded-md" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <div
            key={i}
            className="w-full max-w-140 h-130 rounded-lg overflow-hidden flex flex-col"
          >
            <Skeleton className="w-full h-full min-h-[320px]" />
            <Skeleton className="mt-3 h-5 w-3/4" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
