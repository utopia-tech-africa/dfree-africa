import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { ASCHowItWorksPattern } from "@/assets/svg";
import {
  PiBookOpenText,
  PiCertificate,
  PiClipboardTextLight,
  PiListChecks,
} from "react-icons/pi";

const STEP_KEYS = [
  { key: "apply" as const, number: "1", Icon: PiClipboardTextLight },
  { key: "review" as const, number: "2", Icon: PiListChecks },
  { key: "award" as const, number: "3", Icon: PiCertificate },
  { key: "participate" as const, number: "4", Icon: PiBookOpenText },
];

export const AscHowItWorks = async () => {
  const t = await getTranslations("accessScholarships.howItWorks");
  return (
    <section className="relative w-full bg-white overflow-hidden pb-12">
      <ComponentLayout className="space-y-4 md:space-y-8">
        {/* Header Content */}
        <div className="max-w-[700px] space-y-2">
          <div className="space-y-1">
            <Title text={t("title")} className="text-tertiary-500" />
            <Subtitle text={t("subtitle")} />
          </div>
          <p className="text-base md:text-lg text-neutral-800 font-poppins font-normal leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {STEP_KEYS.map((item) => {
            const Icon = item.Icon;
            return (
              <div
                key={item.key}
                className="bg-primary-500  p-4 rounded-xl relative overflow-hidden flex flex-col space-y-3 group hover:translate-y-[-4px] transition-all duration-300"
              >
                <span className="absolute top-4 right-4 text-8xl font-bold select-none font-montserrat bg-linear-to-t from-primary-300 to-transparent bg-clip-text text-transparent">
                  {item.number}
                </span>
                <div className="text-white relative z-10">
                  <Icon className="size-8" />
                </div>
                <div className="space-y-3 relative z-10">
                  <h3 className="text-2xl font-bold text-white font-montserrat">
                    {t(`steps.${item.key}.title`)}
                  </h3>
                  <p className="text-sm md:text-base text-white/90 font-poppins leading-tight">
                    {t(`steps.${item.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ComponentLayout>

      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] pointer-events-none">
        <Image
          src={ASCHowItWorksPattern}
          alt={t("patternAlt")}
          fill
          className="object-cover object-bottom"
        />
      </div>
    </section>
  );
};
