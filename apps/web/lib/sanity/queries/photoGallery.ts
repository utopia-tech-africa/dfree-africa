import { groq } from "next-sanity";

/** Fetches years with their projects and each project's gallery for the Africa photo gallery. */
export const yearsWithProjectsForGalleryQuery = groq`*[_type == "year"] | order(year desc) {
  year,
  "projects": projects[]-> {
    _id,
    title,
    description,
    "previewMedia": previewMedia {
      type,
      "imageRef": image.asset->,
      "videoUrl": video.asset->url
    },
    "gallery": gallery-> {
      "items": items[] {
        type,
        useAsThumbnail,
        "imageRef": image.asset->,
        "videoUrl": video.asset->url,
        caption
      }
    }
  }
}`;
