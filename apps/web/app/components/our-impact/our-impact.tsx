import ComponentLayout from "@/components/component-layout";
import { ImpactHeader } from "./impact-header";
import { ImpactStats } from "./impact-stats";
import { ImpactGlobe } from "./impact-globe";

export function OurImpact() {
  return (
    <section
      className="w-full py-12 md:py-16 lg:py-20"
      aria-labelledby="our-impact-heading"
    >
      <ComponentLayout className="grid gap-12 lg:grid-cols-[408px_520px] lg:items-start lg:justify-between lg:gap-y-12">
        <ImpactHeader />
        <div className="relative flex size-[343px] items-center justify-center md:size-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:size-[520px] lg:shrink-0">
          <ImpactGlobe className="h-full w-full" />
        </div>
        <ImpactStats />
      </ComponentLayout>
    </section>
  );
}
