import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";

type PrivacySection = {
  key:
    | "whoWeAre"
    | "informationWeCollect"
    | "media"
    | "cookies"
    | "embeddedContent"
    | "whoWeShare"
    | "howLongWeRetain"
    | "yourRights"
    | "whereWeSend";
  paragraphs: number;
  richParagraphs?: readonly ("p1" | "p2" | "p3" | "p4")[];
};

const SECTIONS: PrivacySection[] = [
  { key: "whoWeAre", paragraphs: 1, richParagraphs: ["p1"] },
  { key: "informationWeCollect", paragraphs: 2, richParagraphs: ["p2"] },
  { key: "media", paragraphs: 1 },
  { key: "cookies", paragraphs: 4 },
  { key: "embeddedContent", paragraphs: 2 },
  { key: "whoWeShare", paragraphs: 1 },
  { key: "howLongWeRetain", paragraphs: 2 },
  { key: "yourRights", paragraphs: 1 },
  { key: "whereWeSend", paragraphs: 1 },
];

const linkClassName = "underline text-neutral-900";

export async function PrivacyPolicyContent() {
  const t = await getTranslations("legal.privacy");

  return (
    <section className="relative isolate w-full overflow-hidden bg-neutral-100 pb-16 md:pb-24">
      <div className="pointer-events-none absolute top-1/3 -left-50 z-0 w-full md:w-[60%]">
        <Image
          src="https://res.cloudinary.com/dan9camhs/image/upload/v1773224828/6ea76738-7c0b-4a59-9ff9-5a2b3d706604.webp"
          alt=""
          aria-hidden
          className="object-left"
          height={900}
          width={900}
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>

      <ComponentLayout className="relative z-10 mx-auto py-16 md:py-24">
        <header className="mb-12 text-center md:mb-16">
          <h1 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-1000">
            {t("heading")}
          </h1>
          <p className="mt-3 font-poppins text-base md:text-lg text-neutral-900 ">
            {t("effectiveDate")}
          </p>
        </header>

        <div className="flex flex-col gap-6 md:gap-8">
          {SECTIONS.map(({ key, paragraphs, richParagraphs }) => (
            <section key={key}>
              <h2 className="mb-1 font-montserrat text-xl font-bold text-primary-500 md:text-2xl">
                {t(`sections.${key}.title`)}
              </h2>

              <div className="flex flex-col gap-4 font-poppins text-base md:text-lg leading-relaxed text-neutral-900 ">
                {Array.from({ length: paragraphs }, (_, index) => {
                  const paragraphKey = `p${index + 1}` as
                    | "p1"
                    | "p2"
                    | "p3"
                    | "p4";
                  const translationKey = `sections.${key}.${paragraphKey}`;
                  const isRichParagraph =
                    richParagraphs?.includes(paragraphKey);

                  if (isRichParagraph) {
                    return (
                      <p key={paragraphKey}>
                        {t.rich(translationKey, {
                          link: (chunks) => (
                            <a
                              href={
                                paragraphKey === "p1" && key === "whoWeAre"
                                  ? "https://dfreefoundation.org"
                                  : "https://automattic.com/privacy/"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className={linkClassName}
                            >
                              {chunks}
                            </a>
                          ),
                        })}
                      </p>
                    );
                  }

                  return <p key={paragraphKey}>{t(translationKey)}</p>;
                })}
              </div>
            </section>
          ))}
        </div>
      </ComponentLayout>
    </section>
  );
}
