"use client";

import React from "react";
import { Banner } from "./banner";
import { AfricaBannerBg } from "@/assets/img";
import { useTranslations } from "next-intl";

export const AfricaBanner = ({ classname }: { classname?: string }) => {
  const t = useTranslations("africa.banner");

  return (
    <Banner
      className={classname}
      backgroundImage={AfricaBannerBg}
      title={t("title")}
      description={t("description")}
      href="#"
      label={t("label")}
    />
  );
};
