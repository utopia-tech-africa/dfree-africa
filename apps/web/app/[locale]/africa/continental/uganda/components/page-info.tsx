import React from "react";
import { PageTitle } from "@/components/page-title/page-title";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { getTranslations } from "next-intl/server";

export const PageInfo: React.FC = async () => {
  const t = await getTranslations("uganda.pageInfo");
  return (
    <div className="flex flex-col gap-6">
      <ComponentLayout>
        <PageTitle text={t("mainTitle")} className="font-roboto" />
      </ComponentLayout>

      <hr />

      <ComponentLayout>
        <div className="flex flex-col gap-2 items-center">
          <Title text={t("descTitle")} />
          <p className="text-neutral-1000 text-justify text-lg md:text-2xl font-bold tracking-wide leading-relaxed whitespace-pre-line">
            {t("descText")}
          </p>
        </div>
      </ComponentLayout>
    </div>
  );
};
