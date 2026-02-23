import { groq } from "next-sanity";

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  description,
  country,
  featured,
  "previewMedia": previewMedia {
    type,
    "imageRef": image.asset->,
    "videoUrl": video.asset->url
  }
}`;

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(_createdAt desc) {
  _id,
  title,
  description,
  country,
  featured,
  "previewMedia": previewMedia {
    type,
    "imageRef": image.asset->,
    "videoUrl": video.asset->url
  }
}`;
