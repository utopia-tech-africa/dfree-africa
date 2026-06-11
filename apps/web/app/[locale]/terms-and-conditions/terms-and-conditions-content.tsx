import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ComponentLayout from "@/components/component-layout";
import { Link } from "@/i18n/navigation";

type TermsSection = {
  key:
    | "limitations"
    | "responsibility"
    | "doNotRely"
    | "confidentiality"
    | "ownership"
    | "noWarranties"
    | "severability"
    | "waiver"
    | "jurisdiction"
    | "entireAgreement";
  paragraphs: number;
  richParagraphs?: readonly ("p1" | "p2" | "p3")[];
};

const INTRO_PARAGRAPHS = 4;
const INTRO_RICH: readonly ("p1" | "p2" | "p3" | "p4")[] = ["p2"];

const SECTIONS: TermsSection[] = [
  { key: "limitations", paragraphs: 3, richParagraphs: ["p1"] },
  { key: "responsibility", paragraphs: 1 },
  { key: "doNotRely", paragraphs: 1 },
  { key: "confidentiality", paragraphs: 1, richParagraphs: ["p1"] },
  { key: "ownership", paragraphs: 1 },
  { key: "noWarranties", paragraphs: 1 },
  { key: "severability", paragraphs: 1 },
  { key: "waiver", paragraphs: 1 },
  { key: "jurisdiction", paragraphs: 1 },
  { key: "entireAgreement", paragraphs: 1, richParagraphs: ["p1"] },
];

const linkClassName = "underline text-neutral-900";

function renderRichParagraph(
  translationKey: string,
  t: Awaited<ReturnType<typeof getTranslations>>,
) {
  return t.rich(translationKey, {
    bold: (chunks) => <strong>{chunks}</strong>,
    link: (chunks) => (
      <Link href="/privacy-policy" className={linkClassName}>
        {chunks}
      </Link>
    ),
  });
}

export async function TermsAndConditionsContent() {
  const t = await getTranslations("legal.terms");

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
          <h1 className="font-montserrat text-3xl font-bold text-neutral-1000 md:text-4xl lg:text-5xl">
            {t("heading")}
          </h1>
          <p className="mt-3 font-poppins text-base text-neutral-900 md:text-lg">
            {t("effectiveDate")}
          </p>
        </header>

        <div className="flex flex-col gap-6 md:gap-8">
          <section>
            <h2 className="mb-4 font-montserrat text-xl font-bold text-primary-500 md:text-2xl">
              {t("organization")}
            </h2>

            <div className="flex flex-col gap-4 font-poppins text-base leading-relaxed text-neutral-900 md:text-lg">
              {Array.from({ length: INTRO_PARAGRAPHS }, (_, index) => {
                const paragraphKey = `p${index + 1}` as
                  | "p1"
                  | "p2"
                  | "p3"
                  | "p4";
                const translationKey = `intro.${paragraphKey}`;

                if (INTRO_RICH.includes(paragraphKey)) {
                  return (
                    <p key={paragraphKey}>
                      {renderRichParagraph(translationKey, t)}
                    </p>
                  );
                }

                return <p key={paragraphKey}>{t(translationKey)}</p>;
              })}
            </div>
          </section>

          {SECTIONS.map(({ key, paragraphs, richParagraphs }) => (
            <section key={key}>
              <h2 className="mb-1 font-montserrat text-xl font-bold text-primary-500 md:text-2xl">
                {t(`sections.${key}.title`)}
              </h2>

              <div className="flex flex-col gap-4 font-poppins text-base leading-relaxed text-neutral-900 md:text-lg">
                {Array.from({ length: paragraphs }, (_, index) => {
                  const paragraphKey = `p${index + 1}` as "p1" | "p2" | "p3";
                  const translationKey = `sections.${key}.${paragraphKey}`;
                  const isRichParagraph =
                    richParagraphs?.includes(paragraphKey);

                  if (isRichParagraph) {
                    return (
                      <p key={paragraphKey}>
                        {renderRichParagraph(translationKey, t)}
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
