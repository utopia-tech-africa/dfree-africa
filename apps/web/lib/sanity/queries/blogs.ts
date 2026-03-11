import { groq } from "next-sanity";

export const blogsQuery = groq`
  *[_type == "blog" && (!defined($currentSlug) || slug.current != $currentSlug)] | order(publishedDate desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readTime,
    publishedDate,
    "mainImage": mainImage.asset->url
  }
`;

export const blogBySlugQuery = groq`
*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  readTime,
  publishedDate,
  "mainImage": mainImage.asset->url,
  authorName,
  "authorImage": authorImage.asset->url
}
`;
