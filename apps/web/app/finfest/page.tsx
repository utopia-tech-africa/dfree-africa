import { getFinfestGallery } from "@/lib/sanity";
import {
  FinFestBanner,
  FinfestGallerySection,
  FinFestTestimonials,
} from "./components";

export default async function FinFestPage() {
  const gallery = await getFinfestGallery();
  return (
    <div>
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
