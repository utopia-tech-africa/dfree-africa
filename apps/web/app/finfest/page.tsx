import { getFinfestGallery } from "@/lib/sanity";
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
          label="Gallery"
          title={gallery.title}
          subtitle="Click a year to view its gallery."
        />
      )}
      <FinfestBanner />
    </div>
  );
}
