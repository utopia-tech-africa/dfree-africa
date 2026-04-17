export * from "./hero";
export * from "./page-info";
export * from "./section-card";

export type SectionCardProps = {
  title: string;
  description: string;
  points?: string[] | Record<string, string>;
  cta?: string;
  className?: string;
}[];
