import { createMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { DonateCauses, DonateHero, DonateOurWork } from "./components";
import { PageLayout } from "@/components/page-layout";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return createMetadata({
    title: "Donate",
    description:
      "Support the DFREE movement with a one-time or monthly gift. Fund clean water, medical aid, and community development across Africa.",
    path: `/${locale}/donate`,
  });
}

const DonatePage = () => {
  return (
    <PageLayout>
      <div className="space-y-12 md:space-y-16">
        <DonateHero />
        <DonateCauses />
        <DonateOurWork />
      </div>
    </PageLayout>
  );
};

export default DonatePage;
