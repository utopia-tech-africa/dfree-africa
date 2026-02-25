import ComponentLayout from "@/components/component-layout";
import { PageTitle } from "@/components/page-title/page-title";
import { createMetadata } from "@/lib/seo";
import { getProjects, getYearsWithProjectIds } from "@/lib/sanity";
import type { Metadata } from "next";
import React from "react";
import { AllProjects } from "./components";
import { PageLayout } from "@/components/page-layout";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Explore DFREE Africa's transformative projects across Ghana, South Africa, Uganda, and Liberia.",
  path: "/africa/projects",
});

const ProjectsPage = async () => {
  const [projects, yearsWithProjectIds] = await Promise.all([
    getProjects(),
    getYearsWithProjectIds(),
  ]);
  return (
    <PageLayout>
      <ComponentLayout className="sm:space-y-8">
        <PageTitle text="All Projects" />
        <AllProjects
          projects={projects}
          yearsWithProjectIds={yearsWithProjectIds}
        />
      </ComponentLayout>
    </PageLayout>
  );
};

export default ProjectsPage;
