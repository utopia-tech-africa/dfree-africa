import { groq } from "next-sanity";

export const pastSpeakersQuery = groq`
  *[_type == "pastSpeaker"] | order(_createdAt asc) {
    _id,
    name,
    role,
    "image": image.asset->url
  }
`;
