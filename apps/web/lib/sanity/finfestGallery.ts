import { client } from "./client";
import { urlFor } from "./image";
import { finfestGalleryQuery } from "./queries/finfestGallery";
import type { GalleryItemForUI } from "./photoGallery";

type FinfestGalleryQueryResult = Array<{
  _id?: string | null;
  title?: string | null;
  year?: number | null;
  items?: Array<{
    type?: string | null;
    useAsThumbnail?: boolean | null;
    imageRef?: { _id: string; _type: string } | null;
    videoUrl?: string | null;
    caption?: string | null;
  }> | null;
}>;

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

/** Thumbnail URL for a gallery (useAsThumbnail image or first image). */
function getYearCardThumbnailUrl(
  items: NonNullable<FinfestGalleryQueryResult[number]["items"]>,
): string | null {
  const thumbnailItem = items.find(
    (i) => i?.useAsThumbnail && i?.type === "image" && i?.imageRef,
  );
  if (thumbnailItem?.type === "image" && thumbnailItem.imageRef) {
    return urlFor(thumbnailItem.imageRef).width(800).height(600).url();
  }
  const firstImage = items.find((i) => i?.type === "image" && i?.imageRef);
  if (firstImage?.type === "image" && firstImage.imageRef) {
    return urlFor(firstImage.imageRef).width(800).height(600).url();
  }
  return null;
}

export type FinfestGalleryYearForUI = {
  year: number;
  title: string;
  /** Thumbnail for the year card; null if no image in that year's gallery. */
  thumbnailUrl: string | null;
  items: GalleryItemForUI[];
};

export type FinfestGalleryForUI = {
  title: string;
  years: FinfestGalleryYearForUI[];
};

export async function getFinfestGallery(): Promise<FinfestGalleryForUI | null> {
  const data =
    await client.fetch<FinfestGalleryQueryResult>(finfestGalleryQuery);
  if (!data?.length) return null;

  const years: FinfestGalleryYearForUI[] = [];

  for (const row of data) {
    const year = row.year ?? 0;
    if (year < 2000) continue;

    const rawItems = row.items ?? [];
    const items: GalleryItemForUI[] = [];
    for (const raw of rawItems) {
      const mapped = mapGalleryItem(raw);
      if (mapped) items.push(mapped);
    }

    years.push({
      year,
      title: row.title ?? `Finfest ${year}`,
      thumbnailUrl: getYearCardThumbnailUrl(rawItems),
      items,
    });
  }

  if (years.length === 0) return null;

  return {
    title: "Gallery",
    years,
  };
}
