import { createMetadata } from "@/lib/seo";
import { getFinfestGallery } from "@/lib/sanity";
import type { Metadata } from "next";
import {
  FinfestBanner,
  FinfestPastSpeakers,
  FinfestTestimonials,
  FinfestGallerySection,
  FinfestSponsors,
} from "./components";
import { FinfestHero } from "./components/finfest-hero";
import { FinfestObjective } from "./components/finfest-objective";
import FinfestMovement from "./components/finfest-objective/finfest-movement";

export const metadata: Metadata = createMetadata({
  title: "FinFE$T",
  description:
    "FinFE$T is DFREE's free financial festival for everyone. Learn how to make, manage, and build wealth from industry professionals at our community event.",
  path: "/finfest",
});

export default async function FinFestPage() {
  const gallery = await getFinfestGallery();
  return (
    <div className="space-y-20 sm:space-y-30">
      <FinfestHero />
      <FinfestObjective />
      <FinfestMovement />
      <FinfestPastSpeakers />
      <FinfestSponsors />
      <FinfestTestimonials />
      {gallery && gallery.years.length > 0 && (
        <FinfestGallerySection
          gallery={gallery}
          label="Photo Gallery"
          title={gallery.title}
          subtitle="Our favourite memories  from past  events"
        />
      )}
      <FinfestBanner />
    </div>
  );
}
