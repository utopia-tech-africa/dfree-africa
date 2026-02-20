"use client";

import { useState } from "react";
import { ProjectsFilter } from "./components/projects-filter";
import { ProjectCard } from "./components/project-card";
import { Pagination } from "@/components/pagination/pagination";
import { projects } from "../../data/projects";

export const AllProjects = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-10 my-6">
      <ProjectsFilter />

      {/* {Projects} */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};
