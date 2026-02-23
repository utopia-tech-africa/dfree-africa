"use client";

import { OUR_PILLARS } from "@/lib/pillars";
import { PillarCard } from "./pillar-card";

const Pillars = () => {
  return (
    <section className="w-full bg-neutral-100 py-16">
      <div>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-semibold text-primary-600">
            {OUR_PILLARS.title}
          </h2>

          <p className="max-w-xl text-sm text-muted-foreground md:text-base">
            {OUR_PILLARS.subtitle}
          </p>
        </div>

        <div>
          {OUR_PILLARS.pillars.map((pillarItem) => (
            <PillarCard
              key={pillarItem.pillar}
              pillar={pillarItem.pillar}
              description={pillarItem.description}
              bgImage={pillarItem.bgImage}
              logo={pillarItem.logo}
              href={pillarItem.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
