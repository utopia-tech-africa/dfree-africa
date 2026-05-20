import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import ComponentLayout from "@/components/component-layout";

export async function LeadershipInstituteAbout() {
  const t = await getTranslations("leadershipInstitute.aboutTheInstitute");
  return (
    <ComponentLayout className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Left Column: Text Content */}
      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Title text={t("label")} />
          <Subtitle text={t("title")} />
        </div>

        <div className="space-y-4">
          <p className="text-base md:text-lg text-neutral-900 leading-relaxed font-normal font-poppins whitespace-pre-line">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Right Column: Image */}
      <div className="relative w-full aspect-4/3 sm:aspect-video lg:aspect-16/10 lg:min-h-95 rounded-md overflow-hidden shadow-sm">
        <Image
          src={
            "https://res.cloudinary.com/dan9camhs/image/upload/v1779210304/7cbebd00fd933a4a6a399bcc0b80e00e722b4f72_ovv3e1.webp"
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
