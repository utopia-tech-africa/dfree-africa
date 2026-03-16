"use client";

import React from "react";
import { Banner } from "./banner";
import { useTranslations } from "next-intl";

export const AfricaBanner = ({ classname }: { classname?: string }) => {
  const t = useTranslations("africa.banner");

  return (
    <Banner
      className={classname}
      backgroundImage="https://res.cloudinary.com/dan9camhs/image/upload/v1773146939/afa2bc68-190b-4408-a424-8e57d7718d67.webp"
      title={t("title")}
      description={t("description")}
      href={"https://www.zeffy.com/en-US/donation-form/general-donations-101"}
      label={t("label")}
    />
  );
};
