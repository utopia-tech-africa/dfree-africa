import React, { ReactNode } from "react";
import { PageTitle } from "@/components/page-title/page-title";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";

interface PageInfoProps {
  mainTitle: string;
  descTitle?: string;
  descText: string;
  className?: string;
}

export const PageInfo: React.FC<PageInfoProps> = ({
  mainTitle,
  descTitle,
  descText,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <ComponentLayout>
        <PageTitle text={mainTitle} className="font-roboto" />
      </ComponentLayout>

      <hr />

      <ComponentLayout>
        {(descTitle || descText) && (
          <div className="flex flex-col gap-2 items-center">
            {descTitle && <Title text={descTitle} />}
            <p className="text-neutral-1000 text-center text-2xl font-bold tracking-wide leading-relaxed ">
              {descText}
            </p>
          </div>
        )}
      </ComponentLayout>
    </div>
  );
};
