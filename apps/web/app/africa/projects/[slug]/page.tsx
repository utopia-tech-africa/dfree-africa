import ComponentLayout from "@/components/component-layout";
import { PageLayout } from "@/components/page-layout";
import { getProjectBySlug } from "@/lib/sanity/projects";
import { ProjectBody, ProjectHeader, ProjectImages } from "./components";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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
