"use client";

import { useState } from "react";
import { ProjectsFilter } from "./components/projects-filter";
import { ProjectCard } from "./components/project-card";
import { Pagination } from "@/components/pagination/pagination";
import type { ProjectForUI } from "@/lib/sanity";

type AllProjectsProps = {
  projects: ProjectForUI[];
};

export const AllProjects = ({ projects }: AllProjectsProps) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-10 my-6">
      <ProjectsFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {currentProjects.map((project) => (
          <ProjectCard
            key={
              "_id" in project && typeof project._id === "string"
                ? project._id
                : String(project.title)
            }
            title={project.title}
            description={project.description}
            country={project.country}
            previewMedia={project.previewMedia}
            slug={project.slug}
          />
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
