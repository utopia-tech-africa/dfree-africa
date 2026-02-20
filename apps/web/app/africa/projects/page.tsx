import ComponentLayout from "@/components/component-layout";
import { PageTitle } from "@/components/page-title/page-title";
import React from "react";
import { AllProjects } from "./components";
import { AfricaBanner } from "@/components/banners";

const ProjectsPage = () => {
  return (
    <>
      <ComponentLayout className="sm:space-y-8">
        <PageTitle text="All Projects" />
        <AllProjects />
      </ComponentLayout>
      <div className="my-15">
        <AfricaBanner />
      </div>
    </>
  );
};

export default ProjectsPage;
