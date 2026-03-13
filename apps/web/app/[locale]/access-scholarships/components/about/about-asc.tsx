import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import ComponentLayout from "@/components/component-layout";

export async function ASCAbout() {
  const t = await getTranslations("accessScholarships.about");
  return (
    <ComponentLayout className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Left Column: Text Content */}
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Title text={t("title")} />
          <Subtitle text={t("subtitle")} />
        </div>

        <div className="space-y-4">
          <p className="text-base md:text-lg text-neutral-900 leading-relaxed font-normal font-poppins whitespace-pre-line">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="relative w-full aspect-4/3 sm:aspect-video lg:aspect-square rounded-md overflow-hidden shadow-sm">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1773228676/7b6d07bd-2b41-46ef-a94b-52f2cc767d77.webp"
          }
          alt={t("imageAlt")}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </ComponentLayout>
  );
}
