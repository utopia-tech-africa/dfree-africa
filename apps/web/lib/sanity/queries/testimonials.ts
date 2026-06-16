import { groq } from "next-sanity";

export const testimonialsByPageQuery = groq`
  *[_type == "testimonial" && page == $page] | order(coalesce(sortOrder, 9999) asc, _createdAt asc) {
    _id,
    page,
    sortOrder,
    name,
    role,
    quote,
    mediaType,
    "videoUrl": video.asset->url,
    "profilePhotoUrl": profilePhoto.asset->url,
    "profilePhotoAlt": profilePhoto.alt
  }
`;
