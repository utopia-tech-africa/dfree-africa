import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LeadershipInstituteApplicationForm } from "./application-form";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "metadata.leadershipInstituteApplication",
  });

  return createMetadata({
    title: t("title"),
    description: t("description"),
    path: `/${locale}/leadership-institute/apply`,
    keywords: [
      "DFREE Leadership Institute application",
      "Bottom-Up Leadership Institute",
      "DFREE Fellow application",
      "community leadership training",
    ],
  });
}

export default function LeadershipInstituteApplyPage() {
  return (
    <div className="min-h-screen bg-neutral-100 pt-20 pb-16">
      <LeadershipInstituteApplicationForm />
    </div>
  );
}
