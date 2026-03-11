import { getLocale, getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { cn } from "@/lib/utils";

export const CampaignsAbout = async () => {
  const t = await getTranslations("communityCampaigns.about");
  const locale = await getLocale();

  return (
    <ComponentLayout
      className={cn(
        "flex flex-col items-center justify-center gap-6 text-center mt-10 min-w-0",
        locale === "fr" ? "max-w-3xl lg:max-w-5xl" : "max-w-3xl lg:max-w-4xl",
      )}
    >
      <h3 className="text-2xl md:text-3xl lg:text-[38px] font-bold font-montserrat leading-[120%] text-neutral-1000 w-full min-w-0 md:text-nowrap">
        {t("title")}
      </h3>
      <p className="font-poppins text-base md:text-lg leading-[130%] min-w-0 text-center max-w-3xl mx-auto">
        {t("description")}
      </p>
    </ComponentLayout>
  );
};
