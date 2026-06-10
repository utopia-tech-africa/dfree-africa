"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";

export const ContactForm = () => {
  const t = useTranslations("contactUs");

  return (
    <div className="rounded-3xl bg-white p-6 md:p-8 shadow-xl text-neutral-1000 max-w-2xl mx-auto lg:w-full border-12 border-black/20 h-full w-full flex flex-col justify-center transition-all duration-300">
      <div className="flex flex-col items-center justify-between h-full animate-in fade-in zoom-in-95 duration-300">
        <div className="relative w-full aspect-4/3 mx-auto overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dan9camhs/image/upload/v1781017217/defree_contact_t19mbd.gif"
            alt="Send us a message"
            fill
            className="object-contain"
            unoptimized
            priority
          />
        </div>
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-neutral-1000 text-center mt-6 mb-6">
            {t("sendUsAMessage")}
          </h2>

          <Link
            href="https://us18.list-manage.com/survey?u=2ba91258a4e5ea4e39c211cc9&id=b2d1e29bbc&attribution=false"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "default",
              className: "w-full",
            })}
          >
            {t("sendEnquiry")}
          </Link>
        </div>
      </div>
    </div>
  );
};
