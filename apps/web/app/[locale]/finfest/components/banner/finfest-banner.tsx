import { getTranslations } from "next-intl/server";
import { Banner } from "@/components/banners";

export default async function FinfestBanner() {
  const t = await getTranslations("finfest.banner");
  return (
    <Banner
      backgroundImage={
        "https://res.cloudinary.com/dan9camhs/image/upload/v1790614285/FinFe_t_Banner_uzqdv1.png"
      }
      title={t("title")}
      description={t("description")}
      label={t("label")}
      href="https://dfree.xyz/FF2026"
    />
  );
}
