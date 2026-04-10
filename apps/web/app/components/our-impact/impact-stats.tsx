import { getTranslations } from "next-intl/server";
import { IMPACT_STAT_KEYS } from "@/lib/impact";
import { ImpactStatCard } from "./impact-stat-card";

export async function ImpactStats() {
  const t = await getTranslations("home.ourImpact");

  return (
    <div className="grid w-full max-w-[343px] grid-cols-2 gap-x-10 gap-y-8 md:h-[321px] md:max-w-[408px] md:grid-rows-2 md:gap-x-12 md:gap-y-0">
      {IMPACT_STAT_KEYS.map((key) => (
        <ImpactStatCard
          key={key}
          value={t(`stats.${key}.value`)}
          suffix={t(`stats.${key}.suffix`)}
          label={t(`stats.${key}.label`)}
        />
      ))}
    </div>
  );
}
