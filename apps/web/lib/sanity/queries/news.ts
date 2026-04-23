import { groq } from "next-sanity";

export const newsQuery = groq`
  *[_type == "news" && ($currentSlug == null || slug.current != $currentSlug) && ($featured == null || featured == $featured) && ($category == null || category == $category)] | order(publishedDate desc) [$startIndex...$endIndex] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readTime,
    publishedDate,
    category,
    tags,
    "mainImage": mainImage.asset->url
  }
`;

export const featuredNewsQuery = groq`
  *[_type == "news" && featured == true] | order(publishedDate desc) [0...12] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    readTime,
    publishedDate,
    category,
    tags,
    "mainImage": mainImage.asset->url
  }
`;

export const newsCountQuery = groq`
  count(*[_type == "news" && ($currentSlug == null || slug.current != $currentSlug) && ($featured == null || featured == $featured) && ($category == null || category == $category)])
`;

export const newsBySlugQuery = groq`
*[_type == "news" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  readTime,
  publishedDate,
  category,
  tags,
  "mainImage": mainImage.asset->url,
  authorName,
  "authorImage": authorImage.asset->url
}
`;

export const newsCategoriesQuery = groq`
  array::unique(*[_type == "news" && defined(category)].category)
`;
