import { getTranslations } from "next-intl/server";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { PrivacyPolicyContent } from "./privacy-policy-content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return createMetadata({
    title: t("privacy.title"),
    description: t("privacy.description"),
    path: `/${locale}/privacy-policy`,
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
