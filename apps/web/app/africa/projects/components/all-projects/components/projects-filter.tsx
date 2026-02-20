"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { PiSlidersLight } from "react-icons/pi";

const years = ["2021", "2022", "2023", "2024", "2025", "2026", "2027"];

export const ProjectsFilter = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      {/* {desktop Filter} */}
      <div className="gap-2 hidden sm:flex justify-end items-center w-full">
        <p>Filter by year :</p>
        <div className="flex flex-wrap gap-2">
          {years.map((year, i) => {
            return (
              <Button
                variant="outline"
                key={i}
                className="rounded-md font-normal px-3 "
              >
                {year}
              </Button>
            );
          })}
        </div>
      </div>

      {/* {Mobile Filter} */}
      <div className="sm:hidden w-full flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={() => setOpen(!open)}
          className="rounded-md font-normal self-end flex items-center gap-2"
        >
          <PiSlidersLight
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
          Filter
        </Button>

        {/* Animated Container */}
        <div
          className={`
            grid transition-all duration-300 ease-in-out
            ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
          `}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2 border rounded-md p-3">
              <p>Filter by year :</p>
              <div className="flex flex-wrap gap-2">
                {years.map((year, i) => {
                  return (
                    <Button
                      variant="outline"
                      key={i}
                      className="rounded-md font-normal px-3 "
                    >
                      {year}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
