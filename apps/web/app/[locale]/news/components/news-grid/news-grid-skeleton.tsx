import React from "react";
import ComponentLayout from "@/components/component-layout";
import { Skeleton } from "@/components/ui/skeleton";

export const NewsGridSkeleton = () => {
  return (
    <ComponentLayout className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg overflow-hidden border shadow-sm h-full animate-pulse"
          >
            <Skeleton className="h-60 w-full" />
            <div className="p-4 space-y-4 bg-white -mt-4.5 z-10 rounded-t-2xl">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </ComponentLayout>
  );
};
