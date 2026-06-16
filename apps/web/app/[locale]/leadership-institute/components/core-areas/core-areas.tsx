import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";

const CORE_AREAS_ITEMS: ReadonlyArray<{
  key: "pillar1" | "pillar2" | "pillar3";
  image: string;
}> = [
  {
    key: "pillar1",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1779279443/wimluhufynfo5djqd60x_hlfs9o.webp",
  },
  {
    key: "pillar2",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1779279443/xgacevhbt3tejiwt0a84_hihs53.webp",
  },
  {
    key: "pillar3",
    image:
      "https://res.cloudinary.com/dan9camhs/image/upload/v1779279440/agvf9dclwjgchaomujs0_ximn74.webp",
  },
];

export default async function CoreAreas() {
  const t = await getTranslations("leadershipInstitute.coreAreas");
  return (
    <ComponentLayout className="flex flex-col items-center text-center space-y-4 md:space-y-6">
      <div className="space-y-1 max-w-250">
        <Title text={t("label")} />
        <Subtitle className="leading-none" text={t("title")} />
        <p className="text-sm md:text-base lg:text-lg text-neutral-1000">
          {t.rich("description", {
            br: () => <br />,
          })}
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-8 w-full pt-2 md:pt-4">
        {CORE_AREAS_ITEMS.map((item) => (
          <div
            key={item.key}
            className="relative w-full h-90 sm:h-95 md:h-122.5 rounded-md overflow-hidden group"
          >
            <Image
              src={item.image}
              alt={t(`pillars.${item.key}.imageAlt`)}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

            <div className="absolute bottom-0 left-0 px-4 py-6 text-left space-y-2 w-full">
              <span className="text-sm font-bold text-secondary-400 font-montserrat">
                {t(`pillars.${item.key}.pillarName`)}
              </span>

              <h4 className="text-2xl md:text-[26px] max-w-96.5 font-bold text-white font-montserrat leading-tight line-clamp-2">
                {t(`pillars.${item.key}.pillarTitle`)}
              </h4>

              <p className="text-neutral-200 font-400 font-poppins text-base leading-[120%]">
                {t(`pillars.${item.key}.pillarDescription`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ComponentLayout>
  );
}
