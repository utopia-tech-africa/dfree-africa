export * from "./hero";
export * from "./page-info";
export * from "./section-card";

export type SectionCardProps = {
  title: string;
  description: string;
  video?: {
    thumbnail?: string;
    logo?: string;
    label: string;
    href: string;
  };
}[];
