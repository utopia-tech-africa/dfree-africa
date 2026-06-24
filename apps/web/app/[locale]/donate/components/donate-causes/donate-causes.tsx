import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { getDonationCampaigns } from "@/lib/zeffy/get-donation-campaigns";
import { DonateCauseCard } from "./donate-cause-card";

export async function DonateCauses() {
  const causes = await getDonationCampaigns();

  return (
    <ComponentLayout>
      <div className="mx-auto space-y-2">
        <Title text="Donate to a cause" />
        <Subtitle text="Support a campaign" />
        <p className="font-poppins text-base text-neutral-900 md:text-lg">
          Choose a campaign below to give directly on this page. Every gift
          fuels community, sustainability, and education work across Africa.
        </p>
      </div>

      {causes.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {causes.map((cause) => (
            <DonateCauseCard key={cause.id} cause={cause} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center font-poppins text-base text-neutral-700">
          Campaigns are loading. Please check back shortly.
        </p>
      )}
    </ComponentLayout>
  );
}
