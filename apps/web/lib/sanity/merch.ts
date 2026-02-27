import { client } from "./client";
import { urlFor } from "./image";
import { featuredMerchQuery, allMerchQuery } from "./queries/merch";

export type MerchItemForUI = {
  _id: string;
  title: string;
  slug: string;
  coverImageUrl: string;
  coverImageAlt: string;
  price: number;
  category: string;
  inStock: boolean;
  storeUrl: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapMerchToUI(item: any): MerchItemForUI {
  const asset = item?.coverImage?.asset;
  const coverImageUrl = asset ? urlFor(asset).width(600).height(750).url() : "";
  const coverImageAlt = item?.coverImage?.alt ?? item?.title ?? "";

  return {
    _id: item._id,
    title: item.title ?? "",
    slug: item.slug ?? "",
    coverImageUrl,
    coverImageAlt,
    price: item.price ?? 0,
    category: item.category ?? "",
    inStock: item.inStock ?? true,
    storeUrl: item.storeUrl ?? null,
  };
}

export async function getFeaturedMerch(): Promise<MerchItemForUI[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await client.fetch<any[]>(featuredMerchQuery);
  return (data ?? []).map(mapMerchToUI);
}

export async function getAllMerch(): Promise<MerchItemForUI[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await client.fetch<any[]>(allMerchQuery);
  return (data ?? []).map(mapMerchToUI);
}
