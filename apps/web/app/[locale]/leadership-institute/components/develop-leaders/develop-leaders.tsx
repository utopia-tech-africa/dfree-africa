import React from "react";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Title } from "@/components/title-and-subtitle/title";
import { BusFront, Handshake, Tv } from "lucide-react";
import { DeveopLeadersPattern } from "@/assets";

const DEVELOP_LEADERS_KEYS = [
  { icon: Tv, key: "model1" as const },
  { icon: Handshake, key: "model2" as const },
  { icon: BusFront, key: "model3" as const },
];

export const DevelopLeaders = async () => {
  const t = await getTranslations("leadershipInstitute.developLeaders");
  return (
    <section className="bg-white">
      <ComponentLayout className="flex flex-col space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Title text={t("label")} />
          <Subtitle className="leading-none" text={t("title")} />
          <p className="max-w-[70ch] text-sm md:text-base text-neutral-900">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {DEVELOP_LEADERS_KEYS.map((model, index) => {
            const Icon = model.icon;

            return (
              <div
                key={index}
                className="relative overflow-hidden flex flex-col items-start rounded-md text-left py-6 px-3 h-full bg-primary-500"
              >
                {/* Pattern */}
                <div className="absolute inset-0 pointer-events-none">
                  <DeveopLeadersPattern className="w-full h-full" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full">
                  <Icon className="size-10 mb-6 text-white" />

                  <div className="space-y-2">
                    <h4 className="text-xl md:text-[22px] font-bold text-neutral-100 font-montserrat leading-[1.2]">
                      {t(`models.${model.key}.title`)}
                    </h4>

                    <p className="text-sm md:text-base text-neutral-200 leading-[1.2] max-w-[40ch]">
                      {t(`models.${model.key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center mt-2 text-[20px] md:text-[24px] font-bold text-neutral-1000 leading-[1.2] md:leading-[1.4] font-roboto">
          {t("quote")}
        </p>
      </ComponentLayout>
    </section>
  );
};
