import ComponentLayout from "@/components/component-layout";
import { PageTitle } from "@/components/page-title/page-title";
import { createMetadata } from "@/lib/seo";
import { getProjects, getYearsWithProjectIds } from "@/lib/sanity";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import { AllProjects, ProjectsSkeleton } from "./components";
import { PageLayout } from "@/components/page-layout";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Explore DFREE Africa's transformative projects across Ghana, South Africa, Uganda, and Liberia.",
  path: "/africa/projects",
});

/** Opt out of static prerender so Sanity fetch and useSearchParams work at build time. */
export const dynamic = "force-dynamic";

const ProjectsPage = async () => {
  const [projects, yearsWithProjectIds] = await Promise.all([
    getProjects(),
    getYearsWithProjectIds(),
  ]);
  return (
    <PageLayout>
      <ComponentLayout className="sm:space-y-8">
        <PageTitle text="All Projects" />
        <Suspense fallback={<ProjectsSkeleton />}>
          <AllProjects
            projects={projects}
            yearsWithProjectIds={yearsWithProjectIds}
          />
        </Suspense>
      </ComponentLayout>
    </PageLayout>
  );
};

export default ProjectsPage;
