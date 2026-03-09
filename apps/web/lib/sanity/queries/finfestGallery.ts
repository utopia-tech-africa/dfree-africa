import { groq } from "next-sanity";

/** Fetches all Finfest galleries (one per year), ordered by year desc. Slug must match "finfest*" (e.g. finfest-2024, finfest-2023). */
export const finfestGalleryQuery = groq`*[_type == "gallery" && slug.current match "finfest*" && defined(year)] | order(year desc) {
  _id,
  title,
  year,
  "items": items[] {
    type,
    useAsThumbnail,
    "imageRef": image.asset->,
    "videoUrl": video.asset->url,
    caption
  }
}`;
