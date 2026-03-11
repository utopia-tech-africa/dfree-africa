import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DfreeLogoWhite } from "@/assets/svg";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ComponentLayout from "../component-layout";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  X,
  Youtube,
  Linkedin,
} from "lucide-react";

const FOOTER_ABOUT_KEYS = [
  "whoWeAre",
  "ourMission",
  "ourStory",
  "team",
] as const;
const FOOTER_PILLARS_KEYS = [
  "billionDollarChallenge",
  "dfreeAfrica",
  "communityCampaigns",
  "finfest",
  "dfreeAccessScholarships",
] as const;
const GET_INVOLVED_KEYS = [
  "support",
  "partner",
  "travelWithUs",
  "volunteer",
] as const;

const CONNECT_WITH_US = [
  { icons: [Phone], text: "(844) 693-3733" },
  { icons: [Mail], text: "info@dfree.com" },
  { icons: [Facebook, Instagram, X, Linkedin, Youtube] },
];

export const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <ComponentLayout
      id="footer"
      className="mt-20 lg:px-12 w-full max-w-none scroll-mt-24 bg-primary-500 py-10 text-neutral-100 md:scroll-mt-28 lg:py-12"
    >
      <div className="grid gap-8 lg:grid-cols-[auto_1fr_1fr_1fr_1fr] min-w-0">
        <div className="h-7.25 md:h-11.25 w-fit object-cover">
          <DfreeLogoWhite />
        </div>
        <div className="flex flex-col gap-5">
          <h4 className="text-lg font-bold">{t("about")}</h4>
          <div className="flex flex-col gap-4 text-sm lg:text-base">
            {FOOTER_ABOUT_KEYS.map((key) => (
              <Link href="#" key={key}>
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h4 className="text-lg font-bold">{t("ourPillars")}</h4>
          <div className="flex flex-col gap-4 text-sm lg:text-base">
            {FOOTER_PILLARS_KEYS.map((key) => (
              <Link href="#" key={key} className="text-nowrap">
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h4 className="text-lg font-bold">{t("getInvolved")}</h4>
          <div className="flex flex-col gap-4 text-sm lg:text-base">
            {GET_INVOLVED_KEYS.map((key) => (
              <Link href="#" key={key}>
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <h4 className="text-lg font-bold">{t("connectWithUs")}</h4>
            {CONNECT_WITH_US.map((connect, idx) => (
              <div key={idx} className="flex items-center gap-3">
                {connect.icons?.map((Icon) => (
                  <Link href="#" key={Icon.displayName || Icon.name}>
                    <Icon size={20} />
                  </Link>
                ))}
                {connect.text && (
                  <span className="text-sm lg:text-base">{connect.text}</span>
                )}
              </div>
            ))}
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
                variant={"secondary"}
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
        <span className="text-center">{t("copyright")}</span>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-8 underline text-xs">
          <Link href="#" className="cursor-pointer">
            {t("privacyPolicy")}
          </Link>
          <Link href="#" className="cursor-pointer">
            {t("termsOfService")}
          </Link>
          <Link href="#" className="cursor-pointer">
            {t("cookiesSettings")}
          </Link>
        </div>
      </div>
    </ComponentLayout>
  );
};
