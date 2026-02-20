import ComponentLayout from "@/components/component-layout";
import { PageTitle } from "@/components/page-title/page-title";
import React from "react";
import { AllProjects } from "./components";

const ProjectsPage = () => {
  return (
    <>
      <ComponentLayout className="sm:space-y-8">
        <PageTitle text="All Projects" />
        <AllProjects />
      </ComponentLayout>
    </>
  );
};

export default ProjectsPage;
