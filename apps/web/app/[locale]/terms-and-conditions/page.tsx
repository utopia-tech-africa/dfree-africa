import { getTranslations } from "next-intl/server";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { TermsAndConditionsContent } from "./terms-and-conditions-content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return createMetadata({
    title: t("terms.title"),
    description: t("terms.description"),
    path: `/${locale}/terms-and-conditions`,
  });
}

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsContent />;
}
