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
    title: t("ghana.title"),
    description: t("ghana.description"),
    path: `/${locale}/africa/continental/ghana`,
  });
}

const GhanaPage = async () => {
  const featuredProjects = await getFeaturedProjects("Ghana");
  const t = await getTranslations("africa.ghana");

  const ghanaPageData = [
    {
      title: t("sections.workplace.title"),
      description: t("sections.workplace.description"),
    },
    {
      title: t("sections.church.title"),
      description: t("sections.church.description"),
    },
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
          "https://res.cloudinary.com/dan9camhs/image/upload/v1773145980/8c40374f-96b4-452c-801d-b20c258fa69f.webp"
        }
      />

      <PageInfo
        mainTitle={t("title")}
        descTitle={t("aboutTitle")}
        descText={t("aboutText")}
      />

      {ghanaPageData.map((data, index: number) => {
        const isLast = index % 2 === 0;

        const className = `${isLast ? "bg-primary-500 text-neutral-100" : ""}`;

        return (
          <div className={cn(className, "")} key={index}>
            <SectionCard title={data.title} description={data.description} />
          </div>
        );
      })}

      {featuredProjects.length > 0 && (
        <FeaturedProjects
          projects={featuredProjects}
          // title="Projects"
          subtitle={t("featuredProjects.subtitle")}
          description={t("featuredProjects.description")}
          href="/africa/projects?country=ghana"
        />
      )}
    </div>
  );
};
export default GhanaPage;
