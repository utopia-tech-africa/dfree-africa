"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";
import { useRouter, useSearchParams } from "next/navigation";

interface NewsFilterProps {
  categories: string[];
  selectedCategory: string | null;
}

const NewsFilter = ({ categories, selectedCategory }: NewsFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategorySelect = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <ComponentLayout className="mb-8">
      <div className="flex flex-wrap items-center gap-4">
        <span className="font-bold text-lg md:text-xl text-neutral-1000">
          Categories:
        </span>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button
            variant="outline"
            onClick={() => handleCategorySelect(null)}
            className={cn(
              "rounded-[8px] font-medium px-5 h-11 border-neutral-300 text-neutral-900 hover:bg-neutral-50 hover:ring-1 hover:ring-primary-400 hover:shadow-sm transition-all duration-200",
              selectedCategory === null &&
                "ring-2 ring-primary-400 border-primary-400 bg-neutral-50 shadow-inner",
            )}
          >
            All categories
          </Button>
          {categories.map((category) => (
            <Button
              variant="outline"
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={cn(
                "rounded-[8px] font-medium px-5 h-11 border-neutral-300 text-neutral-900 hover:bg-neutral-50 hover:ring-1 hover:ring-primary-400 hover:shadow-sm transition-all duration-200",
                selectedCategory === category &&
                  "ring-2 ring-primary-400 border-primary-400 bg-neutral-50 shadow-inner",
              )}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </ComponentLayout>
  );
};

export default NewsFilter;
