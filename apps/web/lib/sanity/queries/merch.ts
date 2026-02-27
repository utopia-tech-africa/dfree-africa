import { groq } from "next-sanity";

/** Fetch the first 6 featured merch items, newest first. */
export const featuredMerchQuery = groq`*[_type == "merch" && featured == true] | order(_createdAt desc)[0...6] {
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

/** Fetch all merch items, newest first. */
export const allMerchQuery = groq`*[_type == "merch"] | order(_createdAt desc) {
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
