import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { createMetadata } from "@/lib/seo";

import { LeadershipInstituteSponsorForm } from "./sponsor-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.leadershipInstituteSponsor",
  });

  return createMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/leadership-institute/sponsor`,
    keywords: [
      "DFREE Leadership Institute sponsor",
      "fellowship sponsorship",
      "community leadership investment",
      "DFREE Foundation partnership",
    ],
  });
}

export default function LeadershipInstituteSponsorPage() {
  return (
    <div className="min-h-screen w-full bg-white pt-20 pb-16">
      <LeadershipInstituteSponsorForm />
    </div>
  );
}
