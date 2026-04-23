import { groq } from "next-sanity";

/** Fetch the first 6 featured store items, newest first. */
export const featuredStoreQuery = groq`*[_type == "store" && featured == true] | order(_createdAt desc)[0...6] {
  _id,
  title,
  "slug": slug.current,
  "coverImage": coverImage {
    alt,
    "asset": asset->
  },
  price,
  category,
  inStock,
  storeUrl
}`;

/** Fetch all store items, newest first. */
export const allStoreQuery = groq`*[_type == "store"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "coverImage": coverImage {
    alt,
    "asset": asset->
  },
  price,
  category,
  inStock,
  storeUrl
}`;
