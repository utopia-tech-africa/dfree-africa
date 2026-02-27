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
      <ComponentLayout className="grid gap-8 lg:grid-cols-[408px_520px] lg:items-start lg:justify-between lg:gap-y-8">
        <ImpactHeader />
        <div className="relative flex w-full items-center justify-center lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-auto lg:shrink-0">
          <ImpactGlobe className="max-w-[343px] md:max-w-[420px] lg:max-w-[520px]" />
        </div>
        <ImpactStats />
      </ComponentLayout>
    </section>
  );
}
