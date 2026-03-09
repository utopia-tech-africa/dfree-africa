import ComponentLayout from "@/components/component-layout";
import { PageLayout } from "@/components/page-layout";
import { createMetadata } from "@/lib/seo";
import { getProjectBySlug } from "@/lib/sanity/projects";
import type { Metadata } from "next";
import { ProjectBody, ProjectHeader, ProjectImages } from "./components";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return createMetadata({
      title: "Project",
      path: `/africa/projects/${slug}`,
    });
  }
  const description =
    project.description?.slice(0, 160) ||
    `Learn more about ${project.title}, a DFREE® project${project.country ? ` in ${project.country}` : ""}.`;
  return createMetadata({
    title: project.title,
    description,
    path: `/africa/projects/${slug}`,
  });
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

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
