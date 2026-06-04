import type { StoreItemForUI } from "@/lib/sanity/store";

const STORE_BASE_URL = "https://store.dfree.com/";

type ProductSchema = {
  "@type": "Product";
  name: string;
  image?: string;
  description?: string;
  category?: string;
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: "USD";
    availability: string;
    url: string;
  };
};

export function buildStoreProductsJsonLd(items: StoreItemForUI[]) {
  const products: ProductSchema[] = items.map((item) => ({
    "@type": "Product",
    name: item.title,
    ...(item.coverImageUrl ? { image: item.coverImageUrl } : {}),
    ...(item.category ? { category: item.category } : {}),
    offers: {
      "@type": "Offer",
      price: item.price.toFixed(2),
      priceCurrency: "USD",
      availability: item.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: item.storeUrl ?? STORE_BASE_URL,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DFREE® Store",
    description:
      "Books and resources from the DFREE® financial freedom movement.",
    url: STORE_BASE_URL,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: product,
    })),
  };
}
