import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";

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

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("legal.privacy");

  return (
    <ComponentLayout className="py-16 md:py-24 max-w-3xl">
      <h1 className="text-3xl font-bold font-montserrat text-neutral-1000 mb-6">
        {t("heading")}
      </h1>
      <p className="text-neutral-800 leading-relaxed mb-6">{t("body")}</p>
      <p className="text-neutral-800 leading-relaxed">
        {t("fullPolicy")}{" "}
        <a
          href="https://dfreefoundation.org/privacy-policy/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 underline"
        >
          {t("fullPolicyLink")}
        </a>
        .
      </p>
      <Link href="/" className="inline-block mt-8 text-primary-600 underline">
        {t("backHome")}
      </Link>
    </ComponentLayout>
  );
}
