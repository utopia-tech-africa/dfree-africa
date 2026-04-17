import React from "react";
import { PageTitle } from "@/components/page-title/page-title";
import { cn } from "@/lib/utils";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { getTranslations } from "next-intl/server";

type PageInfoProps = {
  className?: string;
};
export const PageInfo: React.FC<PageInfoProps> = async ({ className }) => {
  const t = await getTranslations("southAfrica");
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <ComponentLayout>
        <PageTitle text={t("pageInfo.mainTitle")} className="font-roboto" />
      </ComponentLayout>

      <hr />

      <ComponentLayout>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-neutral-1000 text-center text-lg md:text-2xl font-bold tracking-wide leading-relaxed whitespace-pre-line ">
            <span className="italic">{t("pageInfo.descText_Quote")}</span>
            <br />
            {t("pageInfo.descText_Quote_Author")}
          </p>
        </div>
      </ComponentLayout>
    </div>
  );
};
