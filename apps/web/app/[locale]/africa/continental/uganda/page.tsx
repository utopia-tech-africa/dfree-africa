import { createMetadata } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero, PageInfo, SectionCard, SectionCardProps } from "./components";
import { cn } from "@/lib/utils";
import { FeaturedProjects } from "../../components";
import { getFeaturedProjects } from "@/lib/sanity";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("uganda.title"),
    description: t("uganda.description"),
    path: `/${locale}/africa/continental/uganda`,
  });
}

const UgandaPage = async ({ params }: Props) => {
  const { locale } = await params;
  const featuredProjects = await getFeaturedProjects(
    "Uganda",
    locale as "en" | "fr" | "es",
  );
  const t = await getTranslations("uganda");

  const ugandaPageData: SectionCardProps = [
    {
      title: t("sections.theCommitment.title"),
      description: t("sections.theCommitment.description"),
    },
    {
      title: t("sections.theImpact.title"),
      description: t("sections.theImpact.description"),
      points: [
        t("sections.theImpact.points.point1"),
        t("sections.theImpact.points.point2"),
        t("sections.theImpact.points.point3"),
      ],
      cta: t("sections.theImpact.cta"),
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <Hero
        bgImage={
          "https://res.cloudinary.com/dan9camhs/image/upload/v1776422905/Uganda_flag_uv1aee.webp"
        }
      />

      <PageInfo />

      {ugandaPageData.map((data, index: number) => {
        const isLast = index % 2 === 0;

        const className = `${isLast ? "bg-primary-500 text-neutral-100" : ""}`;

        return (
          <div className={cn(className, "")} key={index}>
            <SectionCard
              title={data.title}
              description={data.description}
              points={data.points}
              cta={data.cta}
            />
          </div>
        );
      })}

      {featuredProjects.length > 0 && (
        <FeaturedProjects
          projects={featuredProjects}
          // title="Projects"
          subtitle={t("featuredProjects.subtitle")}
          description={t("featuredProjects.description")}
          href="/africa/projects?country=uganda"
        />
      )}
    </div>
  );
};
export default UgandaPage;
