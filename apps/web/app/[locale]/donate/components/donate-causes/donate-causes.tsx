import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Button } from "@/components/ui/button";
import { donateCauses } from "../../data/causes";
import { DonateCauseCard } from "./donate-cause-card";

export function DonateCauses() {
  return (
    <ComponentLayout>
      <div className="mx-auto space-y-2">
        <Title text="Donate to a cause" />
        <Subtitle text="Some causes you can support" />
        <p className="font-poppins text-base text-neutral-900 md:text-lg">
          We channel resources to spark lasting change, centering on three key
          areas: community, sustainability, and education.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {donateCauses.map((cause) => (
          <DonateCauseCard key={cause.id} cause={cause} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button size="lg" className="px-8">
          See more causes
        </Button>
      </div>
    </ComponentLayout>
  );
}
