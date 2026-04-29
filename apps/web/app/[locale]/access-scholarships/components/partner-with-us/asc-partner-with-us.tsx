import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Button } from "@/components/ui/button";
import { ImpactStatCard } from "@/app/components/our-impact/impact-stat-card";

const TIER_KEYS = [
  { value: "$250", key: "oneParticipant" as const },
  { value: "$2,500", key: "cohort" as const },
  { value: "$10,000", key: "site" as const },
  { value: "$25,000", suffix: "+", key: "fullYear" as const },
];

export const ASCPartnerWithUs = async () => {
  const t = await getTranslations("accessScholarships.partnerWithUs");
  return (
    <section className="py-6 bg-white overflow-hidden">
      <ComponentLayout className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Image */}
        <div className="relative size-full rounded-md overflow-hidden">
          <Image
            src={
              "https://res.cloudinary.com/dan9camhs/image/upload/v1773232437/87620744-6963-4cb5-abe9-e0b33f9ce31c.webp"
            }
            alt={t("imageAlt")}
            fill
            className="object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Title text={t("title")} className="text-tertiary-600" />
              <Subtitle
                text={t("subtitle")}
                className="max-w-[500px] leading-tight"
              />
            </div>
            <p className="text-base md:text-lg text-neutral-800 font-poppins font-normal leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Giving Tiers Grid */}
          <div className="grid grid-cols-2 gap-y-6 lg:gap-y-12 gap-x-8">
            {TIER_KEYS.map((tier) => (
              <ImpactStatCard
                key={tier.key}
                value={tier.value}
                suffix={tier.suffix}
                label={t(`tiers.${tier.key}`)}
              />
            ))}
          </div>

          <div className="pt-4">
            <Button size="lg" className="px-8 py-6 text-base font-semibold">
              {t("becomeSponsorCta")}
            </Button>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};
