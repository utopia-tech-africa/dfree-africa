import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Button } from "@/components/ui/button";

const CRITERIA_KEYS = [
  "financialNeed",
  "commitment",
  "desire",
  "individualEnrollment",
  "partnerEnrollment",
] as const;

export const ASCAccessibilty = async () => {
  const t = await getTranslations("accessScholarships.accessibility");
  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* Background Watermark */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] md:w-[700px] md:h-[700px] pointer-events-none select-none">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1773224828/6ea76738-7c0b-4a59-9ff9-5a2b3d706604.webp"
          }
          alt={t("patternAlt")}
          fill
          className="object-contain"
          priority
        />
      </div>

      <ComponentLayout className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12  items-center">
          {/* Left Content */}
          <div className="flex flex-col">
            <div className="space-y-4">
              <Subtitle text={t("title")} className="leading-tight" />
            </div>

            <p className="text-base my-4 text-neutral-800 font-poppins font-medium">
              {t("description")}
            </p>

            <ul className="space-y-4 pt-2">
              {CRITERIA_KEYS.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 text-sm md:text-base text-neutral-1000 font-poppins opacity-90"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-neutral-1000 shrink-0" />
                  <span className="leading-snug">{t(`criteria.${key}`)}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button size="lg" className="px-8 py-6 text-base">
                {t("applyCta")}
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full aspect-4/3 md:aspect-square lg:aspect-5/4 rounded-md overflow-hidden">
            <Image
              src={
                "https://res.cloudinary.com/dan9camhs/image/upload/v1773232228/image_1_guy2fb.webp"
              }
              alt={t("imageAlt")}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};
