import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";

const PROGRAM_BULLET_KEYS = [
  "wealthLab",
  "community",
  "coaching",
  "twelveSteps",
  "certification",
] as const;
const EVENT_BULLET_KEYS = ["registration", "materials", "technology"] as const;

const CARD_IMAGES = [
  "https://res.cloudinary.com/dan9camhs/image/upload/v1773230065/image_a0e4u7.webp",
  "https://res.cloudinary.com/dan9camhs/image/upload/v1773230115/7a103e47-883a-41ac-a958-03ce000b3850.webp",
];

export const ASCWhatsCovered = async () => {
  const t = await getTranslations("accessScholarships.whatsCovered");
  return (
    <section className="bg-white">
      <ComponentLayout className="space-y-2 md:space-y-6">
        <div className="text-center">
          <Subtitle text={t("subtitle")} className="text-neutral-1000" />
          <p className="text-base md:text-lg text-neutral-800 font-poppins max-w-[700px] mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Program Access card */}
          <div className="relative group h-[400px] md:h-[420px] w-full rounded-md overflow-hidden shadow-lg">
            <Image
              src={CARD_IMAGES[0]}
              alt={t("programAccess.title")}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-8 text-white">
              <h3 className="text-2xl md:text-2xl font-bold font-montserrat mb-2 md:mb-4 leading-tight">
                {t("programAccess.title")}
              </h3>
              <ul className="space-y-2">
                {PROGRAM_BULLET_KEYS.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 text-sm md:text-base font-poppins opacity-90"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <span>{t(`programAccess.bullets.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Event Participation card */}
          <div className="relative group h-[400px] md:h-[420px] w-full rounded-md overflow-hidden shadow-lg">
            <Image
              src={CARD_IMAGES[1]}
              alt={t("eventParticipation.title")}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 lg:p-8 text-white">
              <h3 className="text-2xl md:text-2xl font-bold font-montserrat mb-2 md:mb-4 leading-tight">
                {t("eventParticipation.title")}
              </h3>
              <ul className="space-y-2">
                {EVENT_BULLET_KEYS.map((key) => (
                  <li
                    key={key}
                    className="flex items-start gap-3 text-sm md:text-base font-poppins opacity-90"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <span>{t(`eventParticipation.bullets.${key}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </section>
  );
};
