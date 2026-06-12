import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { ourWorkPillars } from "../../data/our-work";

export function DonateOurWork() {
  return (
    <ComponentLayout className="pb-16 md:pb-20">
      <div className="mx-auto space-y-2">
        <Title text="Our work" />
        <Subtitle text="Where Your Impact Goes" />
        <p className="font-poppins text-base text-neutral-900 md:text-lg">
          We direct funds precisely where they create structural change,
          focusing on three core pillars of resilience.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {ourWorkPillars.map((pillar) => {
          const Icon = pillar.icon;

          return (
            <div
              key={pillar.title}
              className="rounded-2xl bg-primary-500 p-8 text-white md:p-10"
            >
              <Icon className="mb-6 h-10 w-10 stroke-[1.5]" aria-hidden />
              <h3 className="mb-3 font-montserrat text-xl font-bold md:text-2xl">
                {pillar.title}
              </h3>
              <p className="font-poppins text-base leading-relaxed text-neutral-200 md:text-lg">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </ComponentLayout>
  );
}
