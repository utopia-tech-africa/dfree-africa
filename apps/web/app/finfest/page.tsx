import { getFinfestGallery } from "@/lib/sanity";
import {
  FinFestBanner,
  FinfestGallerySection,
  FinFestPastSpeakers,
  FinFestTestimonials,
} from "./components";
import { FinfestHero } from "./components/finfest-hero";
import { FinfestObjective } from "./components/finfest-objective";
import FinfestMovement from "./components/finfest-objective/finfest-movement";

export default async function FinFestPage() {
  const gallery = await getFinfestGallery();
  return (
    <div className="space-y-10">
      <FinfestHero />
      <FinfestObjective />
      <FinfestMovement />
      <FinFestPastSpeakers />
      <FinFestTestimonials />
      {gallery && gallery.years.length > 0 && (
        <FinfestGallerySection
          gallery={gallery}
          label="Gallery"
          title={gallery.title}
          subtitle="Click a year to view its gallery."
        />
      )}
      <FinFestBanner />
    </div>
  );
}
