import { getTranslations } from "next-intl/server";
import { Banner } from "@/components/banners";

export default async function FinfestBanner() {
  const t = await getTranslations("finfest.banner");
  return (
    <Banner
      backgroundImage={
        "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/FinFe_t_Banner_uzqdv1.webp"
      }
      title={t("title")}
      description={t.rich("description", {
        em: (chunks) => <em className="font-bold italic">{chunks}</em>,
      })}
      label={t("label")}
      href="https://dfree.xyz/FF2026"
      contentClassName="sm:w-2/3 lg:w-3/5"
    />
  );
}
