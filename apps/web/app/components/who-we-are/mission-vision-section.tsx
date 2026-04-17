import { Title } from "@/components/title-and-subtitle/title";
import { getTranslations } from "next-intl/server";

export const MissionVisionSection = async () => {
  const t = await getTranslations("home.whoWeAre");

  return (
    <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 px-4 sm:px-6 md:px-0">
      <div className="flex flex-col gap-3 flex-1">
        <Title className="text-tertiary-500" text={t("title")} />
        <p className="font-montserrat font-bold text-neutral-1000 text-base sm:text-lg md:text-xl lg:text-[24px] leading-[120%]">
          <span className="text-secondary-600">{t("introHighlight")}</span>
          {t("introRest")}
        </p>
      </div>

      <div className="flex flex-col gap-4 items-start sm:items-end flex-1">
        <div className="flex flex-col gap-3 w-full">
          <Title className="text-tertiary-500" text={t("missionTitle")} />
          <p className="font-poppins text-neutral-1000 text-sm sm:text-base md:text-lg leading-[130%]">
            {t("mission")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Title className="text-tertiary-500" text={t("visionTitle")} />
          <p className="font-poppins text-neutral-1000 text-sm sm:text-base md:text-lg leading-[130%]">
            {t("vision")}
          </p>
        </div>
      </div>
    </div>
  );
};
