import { getTranslations } from "next-intl/server";
import { Banner } from "@/components/banners";

export default async function LeadershipInstitureBanner() {
  const t = await getTranslations("leadershipInstitute.banner");
  return (
    <Banner
      backgroundImage={
        "https://res.cloudinary.com/dan9camhs/image/upload/v1779361776/0543b93b82378b492437b6ff6310d8f13a117741_yswpun.webp"
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
