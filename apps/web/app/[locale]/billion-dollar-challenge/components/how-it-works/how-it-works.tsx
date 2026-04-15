import React from "react";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { GoShieldCheck } from "react-icons/go";
import { PiTargetLight, PiUsersThree } from "react-icons/pi";
import { BsBarChartLine } from "react-icons/bs";

const STEP_KEYS = [
  { icon: PiTargetLight, key: "setGoal" as const },
  { icon: BsBarChartLine, key: "trackProgress" as const },
  { icon: PiUsersThree, key: "buildCommunity" as const },
  { icon: GoShieldCheck, key: "stayAccountable" as const },
];

export const HowItWorks = async () => {
  const t = await getTranslations("bdc.howItWorks");
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white">
      {/* SVG Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="icon-gradient" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2F3F1E" />
            <stop offset="100%" stopColor="#7BA54F" />
          </linearGradient>
        </defs>
      </svg>

      <ComponentLayout className="flex flex-col items-center text-center space-y-4 md:space-y-6">
        <div className="space-y-2 max-w-[800px]">
          <Subtitle text={t("subtitle")} className="text-neutral-1000" />
          <p className="text-sm md:text-base lg:text-lg text-neutral-1000">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full group/how-it-works">
          {STEP_KEYS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-start p-4 rounded-md border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 text-left space-y-2 h-full group-hover/how-it-works:blur-[2px] group-hover/how-it-works:bg-neutral-200 hover:blur-none! hover:bg-white! hover:opacity-100!"
              >
                <div className="p-2">
                  <Icon
                    className="size-8"
                    style={{
                      fill: "url(#icon-gradient)",
                      stroke: "url(#icon-gradient)",
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-neutral-1000 font-montserrat">
                    {t(`steps.${item.key}.title`)}
                  </h4>
                  <p className="text-base text-neutral-800 leading-relaxed">
                    {t(`steps.${item.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ComponentLayout>
    </section>
  );
};
