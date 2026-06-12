import { translateText } from "@/lib/translation";
import { client } from "./client";
import { testimonialsByPageQuery } from "./queries/testimonials";

export const TESTIMONIAL_PAGES = ["home", "billion-dollar-challenge"] as const;

export type TestimonialPage = (typeof TESTIMONIAL_PAGES)[number];

export type TestimonialForUI = {
  id: string;
  page: TestimonialPage;
  name: string;
  role?: string;
  quote?: string;
  mediaType: "image" | "video";
  profilePhotoUrl?: string;
  profilePhotoAlt?: string;
  videoUrl?: string;
};

type SanityTestimonial = {
  _id: string;
  page?: TestimonialPage;
  name?: string;
  role?: string;
  quote?: string;
  mediaType?: "image" | "video";
  profilePhotoUrl?: string;
  profilePhotoAlt?: string;
  videoUrl?: string;
};

function mapTestimonial(testimonial: SanityTestimonial): TestimonialForUI {
  return {
    id: testimonial._id,
    page: testimonial.page ?? "home",
    name: testimonial.name ?? "",
    role: testimonial.role ?? undefined,
    quote: testimonial.quote ?? undefined,
    mediaType: testimonial.mediaType ?? "image",
    profilePhotoUrl: testimonial.profilePhotoUrl ?? undefined,
    profilePhotoAlt: testimonial.profilePhotoAlt ?? undefined,
    videoUrl: testimonial.videoUrl ?? undefined,
  };
}

export async function getTestimonialsByPage(
  page: TestimonialPage,
  locale?: string,
): Promise<TestimonialForUI[]> {
  const testimonials = await client.fetch<SanityTestimonial[]>(
    testimonialsByPageQuery,
    { page },
  );

  const mapped = testimonials.map(mapTestimonial);

  if (!locale || locale === "en") return mapped;

  return Promise.all(
    mapped.map(async (testimonial) => ({
      ...testimonial,
      name: await translateText(testimonial.name, locale),
      role: testimonial.role
        ? await translateText(testimonial.role, locale)
        : undefined,
      quote: testimonial.quote
        ? await translateText(testimonial.quote, locale)
        : undefined,
      profilePhotoAlt: testimonial.profilePhotoAlt
        ? await translateText(testimonial.profilePhotoAlt, locale)
        : undefined,
    })),
  );
}
