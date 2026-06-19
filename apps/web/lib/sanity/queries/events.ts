import { groq } from "next-sanity";

const eventFields = groq`
  _id,
  title,
  "slug": slug.current,
  category,
  "tag": coalesce(tag, tags[0], badge),
  description,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  location,
  eventDate,
  link,
  featured,
  sortOrder
`;

export const eventsQuery = groq`
  *[_type == "event" && ($category == null || category == $category)] | order(coalesce(sortOrder, 9999) asc, eventDate desc) [$startIndex...$endIndex] {
    ${eventFields}
  }
`;

export const featuredEventsQuery = groq`
  *[_type == "event" && featured == true] | order(coalesce(sortOrder, 9999) asc, eventDate desc) [0...12] {
    ${eventFields}
  }
`;

export const eventsCountQuery = groq`
  count(*[_type == "event" && ($category == null || category == $category)])
`;

export const eventCategoriesQuery = groq`
  array::unique(*[_type == "event" && defined(category)].category)
`;
