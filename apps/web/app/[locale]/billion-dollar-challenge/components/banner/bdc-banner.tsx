import { getTranslations } from "next-intl/server";
import { Banner } from "@/components/banners";

export default async function BDCBanner() {
  const t = await getTranslations("bdc.banner");
  return (
    <Banner
      backgroundImage={
        "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/c4bb57b9-22f7-4ff5-8d13-44e7463cbcb2.webp"
      }
      title={t("title")}
      description={t("description")}
      label={t("label")}
      href="https://bdc.dfreefoundation.org"
    />
  );
}
