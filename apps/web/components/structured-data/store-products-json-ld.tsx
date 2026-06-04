import { getFeaturedStore } from "@/lib/sanity/store";
import { buildStoreProductsJsonLd } from "@/lib/structured-data/store-products";

export async function StoreProductsJsonLd() {
  const items = await getFeaturedStore();
  if (!items.length) return null;

  const jsonLd = buildStoreProductsJsonLd(items);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
