import { getTranslations } from "next-intl/server";
import { IMPACT_STAT_KEYS } from "@/lib/impact";
import { ImpactStatCard } from "./impact-stat-card";

export async function ImpactStats() {
  const t = await getTranslations("home.ourImpact");

  return (
    <>
      <div className="grid w-full max-w-[343px] grid-cols-2 gap-x-12 gap-y-10 md:h-[321px] md:max-w-[408px] lg:max-w-[520px] md:grid-rows-2 md:gap-x-32 md:gap-y-4">
        {IMPACT_STAT_KEYS.map((key) => (
          <ImpactStatCard
            key={key}
            value={t(`stats.${key}.value`)}
            suffix={t(`stats.${key}.suffix`)}
            label={t(`stats.${key}.label`)}
          />
        ))}
      </div>
      <p className="font-montserrat font-700 leading-1.2 hidden md:block text-[22px] text-neutral-900 text-nowrap -mt-10">
        {t("text")}
      </p>
    </>
  );
}
