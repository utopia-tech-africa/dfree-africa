import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/constants/footer-items";
import { BsTelephoneFill } from "react-icons/bs";
import { Mail } from "lucide-react";
import ComponentLayout from "@/components/component-layout";

const imageUrl =
  "https://res.cloudinary.com/dan9camhs/image/upload/v1776351125/031576e6e7fc7d974a347d2ef92814609b299f22_sdvdnm.webp";

const ContactPage = () => {
  const t = useTranslations("contactUs");

  return (
    <section className="px-4 md:px-8 pt-18">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt="contact background"
          fill
          className="object-cover inset-0 w-full h-full"
        />

        <div className="absolute inset-0 bg-[#000000B2]" />

        <ComponentLayout className="relative z-10 grid gap-10 md:gap-16 lg:grid-cols-2 py-6 md:py-10">
          {/* left */}
          <div className="order-2 lg:order-1 flex flex-col text-white max-w-xl">
            <div className="space-y-5">
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold leading-[120%] text-neutral-100">
                {(() => {
                  const words = t("text").split(" ");
                  return (
                    <>
                      {words.slice(0, 2).join(" ")}
                      <br />
                      {words.slice(2).join(" ")}
                    </>
                  );
                })()}
              </h1>
              <p className="font-poppins text-sm md:text-lg text-white leading-[130%]">
                {t("subtext")}
              </p>
              <div className="space-y-3 text-sm">
                <p className="font-bold font-montserrat text-lg text-neutral-100">
                  {t("contactCta")}
                </p>

                <div className="flex items-center gap-3">
                  <BsTelephoneFill size={18} />
                  <span>(844) 693-3733</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span>info@dfree.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target={item.target}
                      rel="noopener noreferrer"
                      className="hover:opacity-80 transition"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <p className="font-bold font-montserrat text-lg text-neutral-100">
                {t("newsletterCta")}
              </p>

              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <Input
                  type="email"
                  placeholder={t("placeholderText")}
                  className="w-full flex-1 rounded-full border border-neutral-100 bg-transparent px-4 py-4 md:py-6 placeholder:text-sm placeholder:text-neutral-300"
                />

                <Button
                  className="w-full md:w-auto py-6 font-bold"
                  variant="secondary"
                >
                  {t("buttonText")}
                </Button>
              </div>

              <p className="text-xs text-neutral-200">{t("privacyNote")}</p>
            </div>
          </div>

          {/* placeholder */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl bg-white p-6 md:p-8 shadow-xl">
              <div className="h-75 md:h-100 w-full rounded-lg border border-neutral-300" />
            </div>
          </div>
        </ComponentLayout>
      </div>
    </section>
  );
};

export default ContactPage;
