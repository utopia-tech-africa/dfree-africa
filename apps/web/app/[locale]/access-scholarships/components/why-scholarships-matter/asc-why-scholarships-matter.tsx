import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ASCWhyScholarshipsMatterPattern } from "@/assets/svg";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import ComponentLayout from "@/components/component-layout";

const BULLET_KEYS = [
  "increaseParticipation",
  "supportCommunities",
  "strengthenEducation",
  "boostBdc",
  "advanceMission",
] as const;

export const ASCWhyScholarshipsMatterSection = async () => {
  const t = await getTranslations("accessScholarships.whyScholarshipsMatter");
  return (
    <section className="relative w-full overflow-hidden bg-primary-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[800px]">
        {/* Left Content */}
        <ComponentLayout className="relative flex flex-col justify-center ">
          {/* Pattern Background */}
          <div className="absolute inset-0 opacity-95 pointer-events-none">
            <Image
              src={ASCWhyScholarshipsMatterPattern}
              alt={t("patternAlt")}
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 max-w-[600px] space-y-2 md:space-y-6">
            <div className="space-y-2">
              <Title text={t("title")} className="text-white" />
              <Subtitle text={t("subtitle")} className="text-white" />
            </div>

            <p className="text-base md:text-lg text-neutral-200 font-poppins font-normal leading-relaxed opacity-90">
              {t("description")}
            </p>

            <ul className="space-y-4 md:space-y-5 pt-2">
              {BULLET_KEYS.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 md:gap-4 text-white font-poppins text-sm md:text-base group"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="leading-snug opacity-90 group-hover:opacity-100 transition-opacity">
                    {t(`bullets.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ComponentLayout>

        {/* Right Image */}
        <div className="relative h-[450px] lg:h-auto overflow-hidden">
          <Image
            src={
              "https://res.cloudinary.com/dan9camhs/image/upload/v1773228881/47760dae-a65c-447d-bf32-6b26c13a200f.webp"
            }
            alt={t("imageAlt")}
            fill
            className="object-cover object-center grayscale-20 hover:grayscale-0 transition-all duration-700 hover:scale-105"
            priority
          />
          {/* Subtle overlay for the image */}
          <div className="absolute inset-0 bg-primary-900/10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
