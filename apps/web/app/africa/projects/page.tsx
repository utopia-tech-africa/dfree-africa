import ComponentLayout from "@/components/component-layout";
import { PageTitle } from "@/components/page-title/page-title";
import { createMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/sanity";
import type { Metadata } from "next";
import React from "react";
import { AllProjects } from "./components";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description:
    "Explore DFREE Africa's transformative projects across Ghana, South Africa, Uganda, and Liberia.",
  path: "/africa/projects",
});

const ProjectsPage = async () => {
  const projects = await getProjects();
  return (
    <>
      <ComponentLayout className="sm:space-y-8">
        <PageTitle text="All Projects" />
        <AllProjects projects={projects} />
      </ComponentLayout>
    </>
  );
};

export default ProjectsPage;
