import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { getTranslations } from "next-intl/server";
import React from "react";

const FinfestMovement = async () => {
  const t = await getTranslations("finfest.movement");
  return (
    <ComponentLayout className="flex flex-col md:items-center md:justify-center gap-6 md:text-center my-20 ">
      <Title text={t("title")} />
      <p className="font-poppins text-2xl text-neutral-1000 md:text-3xl lg:text-[32px]  font-bold leading-[120%]">
        {t("description")}
      </p>
    </ComponentLayout>
  );
};

export default FinfestMovement;
