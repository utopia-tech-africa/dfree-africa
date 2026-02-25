"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { PiSlidersLight } from "react-icons/pi";

type ProjectsFilterProps = {
  years: number[];
  selectedYear: number | null;
  onYearSelect: (year: number | null) => void;
};

export const ProjectsFilter = ({
  years,
  selectedYear,
  onYearSelect,
}: ProjectsFilterProps) => {
  const [open, setOpen] = React.useState(false);

  const yearButtons = (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => onYearSelect(null)}
        className={cn(
          "rounded-md font-normal px-3",
          selectedYear === null && "ring-2 ring-primary-500",
        )}
      >
        All
      </Button>
      {years.map((year) => (
        <Button
          variant="outline"
          key={year}
          onClick={() => onYearSelect(year)}
          className={cn(
            "rounded-md font-normal px-3",
            selectedYear === year && "ring-2 ring-primary-500",
          )}
        >
          {year}
        </Button>
      ))}
    </div>
  );

  return (
    <div>
      {/* Desktop filter */}
      <div className="gap-2 hidden sm:flex justify-end items-center w-full">
        <p>Filter by year:</p>
        {yearButtons}
      </div>

      {/* Mobile filter */}
      <div className="sm:hidden w-full flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => setOpen(!open)}
          className="rounded-md font-normal self-end flex items-center gap-2"
        >
          <PiSlidersLight
            className={cn(
              "transition-transform duration-300",
              open && "rotate-180",
            )}
          />
          Filter
        </Button>

        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2 border rounded-md p-3">
              <p>Filter by year:</p>
              {yearButtons}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
