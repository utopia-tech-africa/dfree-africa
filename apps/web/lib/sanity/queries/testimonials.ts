import { groq } from "next-sanity";

export const testimonialsByPageQuery = groq`
  *[_type == "testimonial" && page == $page] | order(_createdAt asc) {
    _id,
    page,
    name,
    role,
    quote,
    mediaType,
    "videoUrl": video.asset->url,
    "profilePhotoUrl": profilePhoto.asset->url,
    "profilePhotoAlt": profilePhoto.alt
  }
`;
