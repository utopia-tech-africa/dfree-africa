"use client";

import React from "react";
import { Banner } from "./banner";
import { useTranslations } from "next-intl";

export const AfricaBanner = ({ classname }: { classname?: string }) => {
  const t = useTranslations("africa.banner");

  return (
    <Banner
      className={classname}
      backgroundImage="https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/afa2bc68-190b-4408-a424-8e57d7718d67.webp"
      title={t("title")}
      description={t("description")}
      href={t("ctaRef")}
      label={t("label")}
    />
  );
};
