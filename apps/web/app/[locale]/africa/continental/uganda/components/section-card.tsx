import React from "react";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";
import { SectionCardProps } from "./index";

export const SectionCard = ({
  title,
  description,
  points,
  cta,
  className,
}: SectionCardProps[number]) => {
  return (
    <ComponentLayout>
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-6 py-12 min-h-[300px]",
          className,
        )}
      >
        <div className="">
          <h3 className="font-roboto uppercase font-bold text-3xl md:text-5xl lg:text-6xl">
            {title}
          </h3>
        </div>
        <div>
          <p className="text-lg whitespace-pre-line">{description}</p>
          {points &&
            Object.values(points).map((point, index) => (
              <ul className="list-disc pl-5" key={index}>
                <li className="text-lg whitespace-pre-line">{point}</li>
              </ul>
            ))}
          {cta && <p className="text-lg whitespace-pre-line mt-4">{cta}</p>}
        </div>
      </div>
    </ComponentLayout>
  );
};
