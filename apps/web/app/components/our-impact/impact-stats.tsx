import { IMPACT_CONTENT } from "@/lib/impact";
import { ImpactStatCard } from "./impact-stat-card";

export function ImpactStats() {
  return (
    <div className="grid w-full max-w-[343px] grid-cols-2 gap-x-6 gap-y-8 md:h-[321px] md:max-w-[408px] md:grid-rows-2 md:gap-0">
      {IMPACT_CONTENT.stats.map((stat) => (
        <ImpactStatCard
          key={stat.label}
          value={stat.value}
          suffix={stat.suffix}
          label={stat.label}
        />
      ))}
    </div>
  );
}
