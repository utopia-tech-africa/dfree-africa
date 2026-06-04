import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DfreeLogoWhite } from "@/assets/svg";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import ComponentLayout from "../component-layout";
import { Mail, Phone } from "lucide-react";
import { FOOTER_SECTIONS, SOCIAL_LINKS } from "@/constants/footer-items";
import { cn } from "@/lib/utils";
import { FooterCookieSettings } from "./footer-cookie-settings";

export const Footer = async () => {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <ComponentLayout
      id="footer"
      className="mt-20 lg:px-12 w-full max-w-none scroll-mt-24 bg-primary-500 py-10 text-neutral-100 md:scroll-mt-28 lg:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[auto_1fr_1fr_1fr_1fr] min-w-0">
        <Link
          href="/"
          aria-label="dfree home"
          className="h-7.25 md:h-11.25 w-fit object-cover"
        >
          <DfreeLogoWhite />
        </Link>

        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-5">
            <h4 className="text-lg font-bold">{t(section.title)}</h4>

            <div className="flex flex-col gap-4 text-sm lg:text-base">
              {section.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  target={item.target}
                  rel={
                    item.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h4 className="text-lg font-bold">{t("connectWithUs")}</h4>

            <div className="flex items-center gap-3">
              <Phone size={20} aria-hidden />
              <span className="text-sm lg:text-base">(844) 693-3733</span>
            </div>

            <Link
              href="mailto:info@dfree.com"
              className="flex items-center gap-3"
            >
              <Mail size={20} aria-hidden />
              <span className="text-sm lg:text-base">info@dfree.com</span>
            </Link>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map(({ icon: Icon, href, target }) => (
                  <Link
                    key={href}
                    href={href}
                    target={target}
                    rel={
                      target === "_blank" ? "noopener noreferrer" : undefined
                    }
                    aria-label={href}
                  >
                    <Icon size={20} />
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "p-5 w-full max-w-40 sm:max-w-45 font-black",
                )}
              >
                {t("ContactUs")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-lg hidden md:block font-bold"></h4>

            <h4 className="text-lg font-bold font-montserrat">
              {t("subscribeToNewsletter")}
            </h4>

            <p className="block md:hidden font-poppins text-sm leading-[120%] text-neutral-100">
              {t("stayConnected")}
            </p>

            <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
              <Input
                type="email"
                placeholder={t("enterEmail")}
                className="w-full rounded-[100px] border border-neutral-100 bg-transparent px-2 py-6 placeholder:text-sm placeholder:text-neutral-300 focus:outline-none md:min-w-75 md:flex-1 md:px-5 lg:min-w-62.5"
              />

              <Button
                className="w-full py-6 font-bold md:w-auto"
                variant="secondary"
              >
                {t("submit")}
              </Button>
            </div>

            <p className="text-xs text-neutral-200">{t("privacyNote")}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <hr className="border-white" />
      </div>

      <div className="mt-6 flex gap-5 w-full flex-col md:flex-row md:items-center justify-center text-sm">
        <span className="text-center">{t("copyright", { year })}</span>

        <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-8 underline text-xs">
          <Link href="/privacy-policy">{t("privacyPolicy")}</Link>
          <Link href="/terms-of-service">{t("termsOfService")}</Link>
          <FooterCookieSettings label={t("cookiesSettings")} />
        </div>
      </div>
    </ComponentLayout>
  );
};
