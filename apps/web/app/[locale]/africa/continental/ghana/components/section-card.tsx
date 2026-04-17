import React from "react";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";

export interface SectionCardSingleProps {
  title: string;
  description: string;
  className?: string;
}

export const SectionCard: React.FC<SectionCardSingleProps> = ({
  title,
  description,
  className,
}) => {
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
        </div>
      </div>
    </ComponentLayout>
  );
};
