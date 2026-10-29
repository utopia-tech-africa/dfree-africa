import { getTranslations } from "next-intl/server";
import { Banner } from "@/components/banners";

export default async function LeadershipInstitureBanner() {
  const t = await getTranslations("leadershipInstitute.banner");
  return (
    <Banner
      backgroundImage={
        "https://pub-36311e041fc14d379b0a69461c1c2a10.r2.dev/images/0543b93b82378b492437b6ff6310d8f13a117741_yswpun.webp"
      }
      title={t("title")}
      description={t("description")}
      label={t("applyCta")}
      href="/leadership-institute/apply"
      secondaryLabel={t("sponsorCta")}
      secondaryHref="/leadership-institute/sponsor"
    />
  );
}
