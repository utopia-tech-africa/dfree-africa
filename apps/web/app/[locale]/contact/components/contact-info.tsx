"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { BsTelephoneFill } from "react-icons/bs";
import { Mail } from "lucide-react";
import Image from "next/image";
import { facebook, instagram, linkedin, youtube, X } from "@/assets/img";

export const ContactInfoMain = () => {
  const t = useTranslations("contactUs");

  return (
    <div className="space-y-5 text-white max-w-xl">
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

      <div className="flex items-center gap-4">
        <a
          href="http://facebook.com/thedfreemovement"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition"
        >
          <Image src={facebook} alt="Facebook" width={22} height={22} />
        </a>
        <a
          href="http://instagram.com/dfreemovement"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition"
        >
          <Image src={instagram} alt="Instagram" width={22} height={22} />
        </a>
        <a
          href="https://x.com/dfreemovement?s=11"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition"
        >
          <Image
            src={X}
            alt="LinkedIn"
            className="invert"
            width={22}
            height={22}
          />
        </a>
        <a
          href="https://www.linkedin.com/company/dfreemovement/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition"
        >
          <Image src={linkedin} alt="LinkedIn" width={22} height={22} />
        </a>
        <a
          href="https://youtube.com/@dfreemovement?si=SkjKFWVdqjUp0H47"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-75 transition"
        >
          <Image src={youtube} alt="YouTube" width={22} height={22} />
        </a>
      </div>
    </div>
  );
};

export const ContactNewsletter = () => {
  const t = useTranslations("contactUs");

  return (
    <div className="space-y-3 text-white max-w-xl">
      <p className="font-bold font-montserrat text-lg text-neutral-100">
        {t("newsletterCta")}
      </p>

      <div className="flex flex-col gap-3 w-full">
        <Input
          type="text"
          placeholder={t("placeholderName")}
          className="w-full rounded-full border border-neutral-100 bg-transparent px-5 py-6 placeholder:text-sm placeholder:text-neutral-300"
        />

        <Input
          type="email"
          placeholder={t("placeholderText")}
          className="w-full rounded-full border border-neutral-100 bg-transparent px-5 py-6 placeholder:text-sm placeholder:text-neutral-300"
        />

        <Button
          className="w-full py-6 font-bold rounded-full bg-white text-neutral-1000 hover:bg-neutral-100 transition"
          variant="secondary"
        >
          {t("buttonText")}
        </Button>
      </div>

      <p className="text-xs text-neutral-300">{t("privacyNote")}</p>
    </div>
  );
};
