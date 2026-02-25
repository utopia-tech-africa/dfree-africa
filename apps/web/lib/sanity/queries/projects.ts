import { groq } from "next-sanity";

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
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
  "slug": slug.current,
  description,
  country,
  featured,
  "previewMedia": previewMedia {
    type,
    "imageRef": image.asset->,
    "videoUrl": video.asset->url
  }
}`;

export const featuredCountryProjectsQuery = groq`*[_type == "project" && country == $country && featured == true] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  country,
  featured,
  "previewMedia": previewMedia {
    type,
    "imageRef": image.asset->,
    "videoUrl": video.asset->url
  }
}`;

/** Years with project IDs for filtering the projects list. */
export const yearsWithProjectIdsQuery = groq`*[_type == "year"] | order(year desc) {
  year,
  "projectIds": projects[]->_id
}`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    country,
    featured,

    "previewMedia": previewMedia {
      type,
      "imageRef": image.asset->,
      "videoUrl": video.asset->url
    },

    details,

    "additionalImages": additionalImages[]{
      asset->
    },

  }
`;
