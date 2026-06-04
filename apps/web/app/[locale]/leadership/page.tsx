import ComponentLayout from "@/components/component-layout";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { Title } from "@/components/title-and-subtitle/title";
import { createMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { BoardOfDirectors, Filings, Staff } from "./components";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("leadership.title"),
    description: t("leadership.description"),
    path: `/${locale}/leadership`,
    keywords: [
      "DFREE leadership",
      "board of directors",
      "nonprofit governance",
      "DFREE Foundation team",
    ],
  });
}

const LeadershipPage = async () => {
  const t = await getTranslations("home.leadership");

  return (
    <ComponentLayout className="mb-20 mt-24 space-y-14">
      <div className="text-center">
        <Title text={t("title")} className="mb-2" />
        <Subtitle text={t("subtitle")} />
      </div>
      <BoardOfDirectors />
      <Staff />
      <Filings />
    </ComponentLayout>
  );
};

export default LeadershipPage;
