import { getTranslations } from "next-intl/server";

export async function ImpactHeader() {
  const t = await getTranslations("home.ourImpact");

  return (
    <div className="flex flex-col gap-3">
      <p className="font-montserrat text-base font-bold leading-[33px] text-tertiary-500">
        {t("label")}
      </p>
      <h2
        id="our-impact-heading"
        className="w-full font-montserrat text-[26px] font-bold leading-[1.2] text-neutral-1000 md:max-w-[399px] md:text-[32px]"
      >
        {t("title")}
      </h2>
      <p className="w-full font-poppins text-sm leading-[1.2] text-neutral-900 md:text-lg md:leading-normal">
        {t("description")}
      </p>
    </div>
  );
}
