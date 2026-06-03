import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactPageContent } from "./contact-page-content";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return createMetadata({
    title: t("contact.title"),
    description: t("contact.description"),
    path: `/${locale}/contact`,
    keywords: [
      "contact DFREE Foundation",
      "nonprofit partnerships",
      "volunteer DFREE",
      "financial education inquiries",
    ],
  });
}

const ContactPage = () => <ContactPageContent />;

export default ContactPage;
