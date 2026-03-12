import { createMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero, PageInfo } from "../components";
import { SectionCard } from "../components/section-card";
import { SectionCardProps } from "../components";
import { cn } from "@/lib/utils";
import { FeaturedProjects } from "../../components";
import { getFeaturedProjects } from "@/lib/sanity";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("southAfrica.title"),
    description: t("southAfrica.description"),
    path: `/${locale}/africa/continental/south-africa`,
  });
}

const SouthAfricaPage = async () => {
  const featuredProjects = await getFeaturedProjects("South Africa");
  const t = await getTranslations("africa.southAfrica");

  const southAfricaPageData: SectionCardProps = [
    {
      title: t("sections.partnerships.title"),
      description: t("sections.partnerships.description"),
    },
    {
      title: t("sections.challenges.title"),
      description: t("sections.challenges.description"),
    },
    {
      title: t("sections.successes.title"),
      description: t("sections.successes.description"),
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <Hero
        bgImage={
          "https://res.cloudinary.com/dan9camhs/image/upload/v1773146514/5c184ee3-66f3-4c20-8a5a-1e4f18f775f7.webp"
        }
      />

      <PageInfo mainTitle={t("title")} descText={t("aboutText")} />

      {southAfricaPageData.map(
        (data: SectionCardProps[number], index: number) => {
          const isLast = index % 2 === 0;

          const className = `${isLast ? "bg-primary-500 text-neutral-100" : ""}`;

          return (
            <div className={cn(className, "")} key={index}>
              <SectionCard title={data.title} description={data.description} />
            </div>
          );
        },
      )}

      {featuredProjects.length > 0 && (
        <FeaturedProjects
          projects={featuredProjects}
          // title="Projects"
          subtitle={t("featuredProjects.subtitle")}
          description={t("featuredProjects.description")}
          href="/africa/projects?country=south%20africa"
        />
      )}
    </div>
  );
};
export default SouthAfricaPage;
