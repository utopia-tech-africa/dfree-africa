import { getTranslations } from "next-intl/server";
import { Banner } from "@/components/banners/banner";

export const AscBanner = async () => {
  const t = await getTranslations("accessScholarships.banner");
  return (
    <Banner
      backgroundImage={
        "https://res.cloudinary.com/dan9camhs/image/upload/v1773233207/7a50e4c9-d6d1-4bc7-9d54-ef03e4d3d5d4.webp"
      }
      title={t("title")}
      description={t("description")}
      label={t("label")}
      href="#"
      secondaryLabel={t("secondaryLabel")}
      secondaryHref="#"
    />
  );
};
