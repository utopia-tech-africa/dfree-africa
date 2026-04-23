import { translateText, translatePortableText } from "@/lib/translation";
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
  yearsWithProjectIdsQuery,
} from "./queries/projects";

export type ProjectForUI = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  country: string;
  featured: boolean;
  isOngoing: boolean;
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
  isOngoing: boolean;
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
    isOngoing: project.isOngoing ?? false,
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
    isOngoing: project.isOngoing ?? false,
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

export type YearWithProjectIds = {
  year: number;
  projectIds: string[];
};

type YearsWithProjectIdsQueryResult = Array<{
  year?: number | null;
  projectIds?: (string | null)[];
}>;

export type LocaleForTranslation = "en" | "fr" | "es";

export async function getProjects(
  locale?: LocaleForTranslation,
): Promise<ProjectForUI[]> {
  const data = await client.fetch<ProjectsQueryResult>(projectsQuery);
  const list = data.map(mapProjectToUI);

  if (!locale || locale === "en") return list;

  return Promise.all(
    list.map(async (project) => ({
      ...project,
      title: await translateText(project.title, locale),
      description: await translateText(project.description, locale),
    })),
  );
}

export async function getYearsWithProjectIds(): Promise<YearWithProjectIds[]> {
  const data = await client.fetch<YearsWithProjectIdsQueryResult>(
    yearsWithProjectIdsQuery,
  );
  return (data ?? [])
    .filter(
      (row): row is { year: number; projectIds: (string | null)[] } =>
        row?.year != null,
    )
    .map((row) => ({
      year: Number(row.year),
      projectIds: (row.projectIds ?? []).filter(
        (id): id is string => id != null && id !== "",
      ),
    }));
}

export async function getFeaturedProjects(
  country?: string,
  locale?: LocaleForTranslation,
): Promise<ProjectForUI[]> {
  let list: ProjectForUI[];

  if (country) {
    const data = await client.fetch<FeaturedProjectsQueryResult>(
      featuredCountryProjectsQuery,
      { country },
    );
    list = data.map(mapProjectToUI);
  } else {
    const data = await client.fetch<FeaturedProjectsQueryResult>(
      featuredProjectsQuery,
      { country },
    );
    list = data.map(mapProjectToUI);
  }

  if (!locale || locale === "en") return list;

  return Promise.all(
    list.map(async (project) => ({
      ...project,
      title: await translateText(project.title, locale),
      description: await translateText(project.description, locale),
    })),
  );
}

export async function getProjectBySlug(
  slug: string,
  locale?: LocaleForTranslation,
): Promise<ProjectDetailForUI | null> {
  const data = await client.fetch(projectBySlugQuery, { slug });

  if (!data) return null;

  const base = mapProjectDetailToUI(data);

  if (!locale || locale === "en") return base;

  const [title, description, details, galleryTitle] = await Promise.all([
    translateText(base.title, locale),
    translateText(base.description, locale),
    translatePortableText(base.details, locale),
    base.gallery?.title
      ? translateText(base.gallery.title, locale)
      : Promise.resolve(undefined),
  ]);

  return {
    ...base,
    title,
    description,
    details,
    gallery: base.gallery
      ? { ...base.gallery, title: galleryTitle ?? base.gallery.title }
      : null,
  };
}
