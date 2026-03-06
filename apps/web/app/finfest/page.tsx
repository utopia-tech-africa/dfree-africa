import { getFinfestGallery } from "@/lib/sanity";
import {
  FinfestBanner,
  FinfestPastSpeakers,
  FinfestTestimonials,
  FinfestGallerySection,
} from "./components";

export default function FinFestPage() {
  return (
    <div className="space-y-10">
      <FinfestPastSpeakers />
      <FinfestTestimonials />
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
