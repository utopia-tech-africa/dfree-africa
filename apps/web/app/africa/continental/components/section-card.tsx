import React from "react";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";

interface SectionCardProps {
  title: string;
  description: string;
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <ComponentLayout>
      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-6 py-12 ",
          className,
        )}
      >
        <div className="">
          <h3 className="font-roboto uppercase font-bold text-3xl">{title}</h3>
        </div>
        <div>
          <p className="font-medium text-lg ">{description}</p>
        </div>
      </div>
    </ComponentLayout>
  );
};
