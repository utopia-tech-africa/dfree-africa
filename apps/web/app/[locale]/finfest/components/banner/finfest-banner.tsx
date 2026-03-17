import { getTranslations } from "next-intl/server";
import { Banner } from "@/components/banners";

export default async function FinfestBanner() {
  const t = await getTranslations("finfest.banner");
  return (
    <Banner
      backgroundImage={
        "https://res.cloudinary.com/dan9camhs/image/upload/v1773235932/9a5b5be0-a395-4cc2-9a70-3827db18ba0c.webp"
      }
      title={t("title")}
      description={t("description")}
      label={t("label")}
      href="https://dfree.com/finfest/"
    />
  );
}
