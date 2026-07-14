import React from "react";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Title } from "@/components/title-and-subtitle/title";
import { Footprints, GraduationCap, Search, Users } from "lucide-react";

const HOW_IT_WORKS_KEYS = [
  { icon: Search, key: "work1" as const },
  { icon: Footprints, key: "work2" as const },
  { icon: GraduationCap, key: "work3" as const },
  { icon: Users, key: "work4" as const },
];

export const HowItWorks = async () => {
  const t = await getTranslations("leadershipInstitute.howItWorks");
  return (
    <section className=" bg-white">
      <ComponentLayout className="flex flex-col space-y-4 md:space-y-6">
        <div className="space-y-2 flex flex-col md:items-center md:justify-center md:text-center">
          <Title text={t("label")} />
          <Subtitle className="leading-none" text={t("title1")} />
          <Subtitle className="leading-none" text={t("title2")} />
          <p className="max-w-[70ch] text-sm md:text-base text-neutral-900">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {HOW_IT_WORKS_KEYS.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="relative overflow-hidden flex flex-col items-start rounded-md text-left py-6 px-3 h-full md:border md:border-neutral-200 bg-white md:shadow-sm md:hover:shadow-md md:transition-all md:duration-300 space-y-2 md:group-hover/how-it-works:blur-[2px] md:group-hover/how-it-works:bg-neutral-200 md:hover:blur-none! md:hover:bg-white! hover:opacity-100!"
              >
                {/* Background Number */}
                <span className="absolute top-1 right-3 text-[100px] font-extrabold leading-none pointer-events-none select-none opacity-50 bg-[linear-gradient(180deg,#D3D3D3_0%,#646464_100%)] bg-clip-text text-transparent">
                  {index + 1}
                </span>

                {/* Content */}
                <div className="relative z-10 w-full">
                  <Icon className="size-10 mb-6 text-neutral-1000" />

                  <div className="space-y-2">
                    <h4 className="text-xl md:text-[22px] font-bold text-neutral-1000 font-montserrat leading-[1.2]">
                      {t(`items.${item.key}.title`)}
                    </h4>

                    <p className="text-sm md:text-base text-neutral-900 leading-[1.2] max-w-[40ch]">
                      {t(`items.${item.key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ComponentLayout>
    </section>
  );
};
