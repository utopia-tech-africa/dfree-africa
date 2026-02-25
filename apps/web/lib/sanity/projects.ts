import type {
  FeaturedProjectsQueryResult,
  ProjectsQueryResult,
} from "./sanity.types";
import { client } from "./client";
import { urlFor } from "./image";
import {
  featuredCountryProjectsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  projectsQuery,
} from "./queries/projects";

export type ProjectForUI = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  country: string;
  featured: boolean;
  previewMedia: {
    type: "image" | "video";
    url: string;
  };
};

export type ProjectDetailForUI = {
  _id: string;
  title: string;
  description: string;
  country: string;
  featured: boolean;
  previewMedia: {
    type: "image" | "video";
    url: string;
  };
  details: any; // Portable text (you'll render with PortableText)
  additionalImages: string[];
  gallery: {
    _id: string;
    title: string;
    images: string[];
  } | null;
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
    slug: project.slug ?? "",
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

type ProjectDetailQueryResult = Awaited<ReturnType<typeof client.fetch>>;

function mapProjectDetailToUI(project: any): ProjectDetailForUI {
  const preview = project?.previewMedia;
  let previewUrl = "";

  if (preview?.type === "image" && preview.imageRef) {
    previewUrl = urlFor(preview.imageRef).width(1200).height(800).url();
  } else if (preview?.type === "video" && preview.videoUrl) {
    previewUrl = preview.videoUrl ?? "";
  }

  const additionalImages =
    project?.additionalImages?.map((img: any) =>
      urlFor(img).width(1200).height(800).url(),
    ) ?? [];

  const galleryImages =
    project?.gallery?.images?.map((img: any) =>
      urlFor(img).width(1200).height(800).url(),
    ) ?? [];

  return {
    _id: project._id,
    title: project.title ?? "",
    description: project.description ?? "",
    country: project.country ?? "",
    featured: project.featured ?? false,
    previewMedia: {
      type: (preview?.type ?? "image") as "image" | "video",
      url: previewUrl,
    },
    details: project.details ?? [],
    additionalImages,
    gallery: project.gallery
      ? {
          _id: project.gallery._id,
          title: project.gallery.title ?? "",
          images: galleryImages,
        }
      : null,
  };
}

export async function getProjects(): Promise<ProjectForUI[]> {
  const data = await client.fetch<ProjectsQueryResult>(projectsQuery);
  return data.map(mapProjectToUI);
}

export async function getFeaturedProjects(
  country?: string,
): Promise<ProjectForUI[]> {
  if (country) {
    const data = await client.fetch<FeaturedProjectsQueryResult>(
      featuredCountryProjectsQuery,
      {
        country,
      },
    );

    return data.map(mapProjectToUI);
  } else {
    const data = await client.fetch<FeaturedProjectsQueryResult>(
      featuredProjectsQuery,
      {
        country,
      },
    );

    return data.map(mapProjectToUI);
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetailForUI | null> {
  const data = await client.fetch(projectBySlugQuery, { slug });

  if (!data) return null;

  return mapProjectDetailToUI(data);
}
