import Image from "next/image";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Button } from "@/components/ui/button";
import { ImpactStatCard } from "@/app/components/our-impact/impact-stat-card";

export const ASCPartnerWithUs = () => {
  const tiers = [
    {
      value: "$250",
      label: "Supports one participant",
    },
    {
      value: "$2,500",
      label: "Supports a 10-person cohort",
    },
    {
      value: "$10,000",
      label: "Supports a community partner site",
    },
    {
      value: "$25,000",
      suffix: "+",
      label: "Supports a full-year scholarship fund",
    },
  ];

  return (
    <section className="py-6 bg-white overflow-hidden">
      <ComponentLayout className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Image */}
        <div className="relative size-full rounded-md overflow-hidden">
          <Image
            src={
              "https://res.cloudinary.com/dan9camhs/image/upload/v1773232437/87620744-6963-4cb5-abe9-e0b33f9ce31c.webp"
            }
            alt="People joining hands"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Title text="Partner with us" className="text-tertiary-600" />
              <Subtitle
                text="Join Us in Expanding Access to Financial Freedom"
                className="max-w-[500px] leading-tight"
              />
            </div>
            <p className="text-base md:text-lg text-neutral-800 font-poppins font-normal leading-relaxed">
              Scholarships are funded through corporate, philanthropic, and
              community partners.
            </p>
          </div>

          {/* Donation Tiers Grid */}
          <div className="grid grid-cols-2 gap-y-6 lg:gap-y-10 gap-x-2">
            {tiers.map((tier, index) => (
              <ImpactStatCard
                key={index}
                value={tier.value}
                suffix={tier.suffix}
                label={tier.label}
              />
            ))}
          </div>

          <div className="pt-4">
            <Button size="lg" className="px-8 py-6 text-base font-semibold">
              Become a sponsor
            </Button>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};
