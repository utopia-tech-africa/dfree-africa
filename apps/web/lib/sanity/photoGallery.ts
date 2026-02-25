import { client } from "./client";
import { urlFor } from "./image";
import { yearsWithProjectsForGalleryQuery } from "./queries/photoGallery";

/** Single image or video in a project gallery */
export type GalleryItemForUI = {
  type: "image" | "video";
  url: string;
  caption?: string;
};

/** Project as shown in "Choose a project" modal and whose gallery can be viewed */
export type ProjectForGalleryPicker = {
  id: string;
  title: string;
  description: string;
  /** One image from the project's gallery used as thumbnail (or preview image as fallback) */
  thumbnailImageUrl: string;
  previewMedia: { type: "image" | "video"; url: string };
  galleryItems: GalleryItemForUI[];
};

/** Year card with card image and list of projects */
export type YearWithProjectsForUI = {
  year: number;
  cardImageUrl: string;
  projects: ProjectForGalleryPicker[];
};

/** Shape returned by yearsWithProjectsForGalleryQuery */
type YearWithProjectsQueryResult = Array<{
  year?: number | null;
  projects?: Array<{
    _id?: string | null;
    title?: string | null;
    description?: string | null;
    previewMedia?: {
      type?: string | null;
      imageRef?: { _id: string; _type: string } | null;
      videoUrl?: string | null;
    } | null;
    gallery?: {
      items?: Array<{
        type?: string | null;
        useAsThumbnail?: boolean | null;
        imageRef?: { _id: string; _type: string } | null;
        videoUrl?: string | null;
        caption?: string | null;
      }> | null;
    } | null;
  }> | null;
}>;

function getPreviewUrl(
  preview:
    | {
        type?: string | null;
        imageRef?: { _id: string; _type: string } | null;
        videoUrl?: string | null;
      }
    | null
    | undefined,
): string {
  if (!preview) return "";
  if (preview.type === "image" && preview.imageRef) {
    return urlFor(preview.imageRef).width(800).height(600).url();
  }
  if (preview.type === "video" && preview.videoUrl)
    return preview.videoUrl ?? "";
  return "";
}

function mapGalleryItem(item: {
  type?: string | null;
  imageRef?: { _id: string; _type: string } | null;
  videoUrl?: string | null;
  caption?: string | null;
}): GalleryItemForUI | null {
  if (item.type === "image" && item.imageRef) {
    return {
      type: "image",
      url: urlFor(item.imageRef).width(1230).height(686).url(),
      caption: item.caption ?? undefined,
    };
  }
  if (item.type === "video" && item.videoUrl) {
    return {
      type: "video",
      url: item.videoUrl,
      caption: item.caption ?? undefined,
    };
  }
  return null;
}

function mapProject(
  p: NonNullable<YearWithProjectsQueryResult[number]["projects"]>[number],
): ProjectForGalleryPicker | null {
  if (!p?._id || !p.title) return null;
  const previewUrl = getPreviewUrl(p.previewMedia);
  const items = p.gallery?.items ?? [];
  const galleryItems = items
    .map(mapGalleryItem)
    .filter((x): x is GalleryItemForUI => x != null);
  const thumbnailItem = items.find(
    (item) => item?.useAsThumbnail && item?.type === "image" && item?.imageRef,
  );
  const mappedThumb = thumbnailItem ? mapGalleryItem(thumbnailItem) : null;
  const thumbnailFromToggle =
    mappedThumb?.type === "image" ? mappedThumb.url : null;
  const firstGalleryImage = galleryItems.find((i) => i.type === "image");
  const thumbnailImageUrl =
    thumbnailFromToggle ??
    firstGalleryImage?.url ??
    (p.previewMedia?.type === "image" ? previewUrl : "");
  return {
    id: p._id,
    title: p.title,
    description: p.description ?? "",
    thumbnailImageUrl,
    previewMedia: {
      type: (p.previewMedia?.type === "video" ? "video" : "image") as
        | "image"
        | "video",
      url: previewUrl,
    },
    galleryItems,
  };
}

/** Use one image from the year's galleries as the year card thumbnail (prefer gallery image over project preview). */
function getYearCardImageUrl(
  yearData: YearWithProjectsQueryResult[number],
): string {
  const projects = yearData.projects ?? [];
  for (const p of projects) {
    const firstImage = p?.gallery?.items?.find(
      (i) => i.type === "image" && i.imageRef,
    );
    if (firstImage?.type === "image" && firstImage.imageRef) {
      return urlFor(firstImage.imageRef).width(800).height(600).url();
    }
  }
  for (const p of projects) {
    const previewUrl = getPreviewUrl(p?.previewMedia);
    if (previewUrl) return previewUrl;
  }
  return "";
}

export type PhotoGalleryForUI = {
  label: string;
  title: string;
  subtitle: string;
  years: YearWithProjectsForUI[];
};

function mapYearsToUI(
  data: YearWithProjectsQueryResult | null,
): PhotoGalleryForUI | null {
  if (!data || !Array.isArray(data)) return null;

  const years: YearWithProjectsForUI[] = data
    .filter(
      (row): row is NonNullable<typeof row> => row != null && row.year != null,
    )
    .map((row) => {
      const projects = (row.projects ?? [])
        .map(mapProject)
        .filter((p): p is ProjectForGalleryPicker => p != null);
      return {
        year: Number(row.year),
        cardImageUrl: getYearCardImageUrl(row),
        projects,
      };
    })
    .filter((y) => y.projects.length > 0);

  if (years.length === 0) return null;

  return {
    label: "Photo Gallery",
    title: "Moments of impact",
    subtitle: "Capturing stories of transformation across communities",
    years,
  };
}

export async function getPhotoGallery(): Promise<PhotoGalleryForUI | null> {
  const data = await client.fetch<YearWithProjectsQueryResult>(
    yearsWithProjectsForGalleryQuery,
  );
  return mapYearsToUI(data);
}
