import ComponentLayout from "@/components/component-layout";
import { PageLayout } from "@/components/page-layout";
import { createMetadata } from "@/lib/seo";
import { getProjectBySlug } from "@/lib/sanity/projects";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ProjectBody, ProjectHeader, ProjectImages } from "./components";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const project = await getProjectBySlug(slug, locale as "en" | "fr" | "es");
  if (!project) {
    return createMetadata({
      title: t("project.title"),
      description: t("project.descriptionFallback"),
      path: `/${locale}/africa/projects/${slug}`,
    });
  }
  const description =
    project.description?.slice(0, 160) || t("project.descriptionFallback");
  return createMetadata({
    title: project.title,
    description,
    path: `/${locale}/africa/projects/${slug}`,
  });
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(slug, locale as "en" | "fr" | "es");

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <PageLayout>
      <ComponentLayout className="sm:space-y-8">
        <ProjectHeader project={project} />
      </ComponentLayout>
      <hr className="my-5 sm:my-12" />
      <ComponentLayout className="sm:space-y-8">
        <ProjectBody project={project} />
        <ProjectImages project={project} />
      </ComponentLayout>
    </PageLayout>
  );
};

export default ProjectDetailPage;
