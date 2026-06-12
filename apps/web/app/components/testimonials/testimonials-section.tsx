import { getLocale, getTranslations } from "next-intl/server";
import {
  getTestimonialsByPage,
  type TestimonialPage,
} from "@/lib/sanity/testimonials";
import Testimonials from "./testimonials";

type Props = {
  page: TestimonialPage;
  translationNamespace: string;
};

export async function TestimonialsSection({
  page,
  translationNamespace,
}: Props) {
  const locale = await getLocale();
  const t = await getTranslations(translationNamespace);
  const items = await getTestimonialsByPage(page, locale);

  return (
    <Testimonials
      title={t("title")}
      heading={t("heading")}
      subtitle={t("subtitle")}
      muteVideoLabel={t("muteVideo")}
      unmuteVideoLabel={t("unmuteVideo")}
      items={items}
    />
  );
}
