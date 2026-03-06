import { getFinfestGallery } from "@/lib/sanity";
import { FinFestBanner, FinfestGallerySection } from "./components";

export default async function FinFestPage() {
  const gallery = await getFinfestGallery();
  return (
    <div>
      {gallery && gallery.years.length > 0 && (
        <FinfestGallerySection
          gallery={gallery}
          label="Gallery"
          title={gallery.title}
          subtitle="Click a year to view its gallery."
        />
      )}
      <FinFestTestimonials />
      <FinFestBanner />
    </div>
  );
}
