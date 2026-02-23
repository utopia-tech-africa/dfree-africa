import type {
  FeaturedProjectsQueryResult,
  ProjectsQueryResult,
} from "./sanity.types";
import { client } from "./client";
import { urlFor } from "./image";
import { featuredProjectsQuery, projectsQuery } from "./queries/projects";

export type ProjectForUI = {
  _id: string;
  title: string;
  description: string;
  country: string;
  featured: boolean;
  previewMedia: {
    type: "image" | "video";
    url: string;
  };
};

type ProjectQueryItem = ProjectsQueryResult[number];

function mapProjectToUI(project: ProjectQueryItem): ProjectForUI {
  const preview = project?.previewMedia;
  let url = "";

  if (preview?.type === "image" && preview.imageRef) {
    url = urlFor(preview.imageRef).width(800).height(600).url();
  } else if (preview?.type === "video" && preview.videoUrl) {
    url = preview.videoUrl ?? "";
  }

  return {
    _id: project._id,
    title: project.title ?? "",
    description: project.description ?? "",
    country: project.country ?? "",
    featured: project.featured ?? false,
    previewMedia: {
      type: (preview?.type ?? "image") as "image" | "video",
      url,
    },
  };
}

export async function getProjects(): Promise<ProjectForUI[]> {
  const data = await client.fetch<ProjectsQueryResult>(projectsQuery);
  return data.map(mapProjectToUI);
}

export async function getFeaturedProjects(): Promise<ProjectForUI[]> {
  const data = await client.fetch<FeaturedProjectsQueryResult>(
    featuredProjectsQuery,
  );
  return data.map(mapProjectToUI);
}
