"use client"; // this component is simple but may contain interactive elements in future

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

const LeftPanel = () => {
  const t = useTranslations("home.merch");

  return (
    <div className="flex flex-col items-start gap-5 md:w-[30%] shrink-0">
      <p className="font-montserrat font-bold text-neutral-100 tracking-wide text-base leading-[150%]">
        {t("eyebrow")}
      </p>

      <h2
        className="font-montserrat font-bold text-neutral-100 leading-tight"
        style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
      >
        {t("titleLine")}
      </h2>

      <p className="text-neutral-400 leading-relaxed">{t("description")}</p>

      <Link href={"https://store.dfree.com/"}>
        <Button
          variant="secondary"
          size="lg"
          className="p-6 mt-2 text-lg text-primary-500"
        >
          {t("visitStoreCta")}
        </Button>
      </Link>
    </div>
  );
};

export default LeftPanel;
