"use client";

import Image from "next/image";
import ComponentLayout from "@/components/component-layout";
import { ContactInfoMain, ContactNewsletter, ContactForm } from "./components";

const imageUrl =
  "https://res.cloudinary.com/dan9camhs/image/upload/v1776351125/031576e6e7fc7d974a347d2ef92814609b299f22_sdvdnm.webp";

export function ContactPageContent() {
  return (
    <section className="px-4 md:px-8 pt-18">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt="contact background"
          fill
          sizes="100vw"
          className="object-cover inset-0 w-full h-full"
        />

        <div className="absolute inset-0 bg-[#000000B2]" />

        <ComponentLayout className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 py-6 md:py-10">
          {/* Main Info Section (First on mobile, Top-Left on desktop) */}
          <div className="order-1 lg:order-none lg:col-start-1 lg:row-start-1 flex flex-col justify-center">
            <ContactInfoMain />
          </div>

          {/* Contact Form Section (Second on mobile, Right column on desktop) */}
          <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 flex flex-col justify-center h-full">
            <ContactForm />
          </div>

          {/* Newsletter Section (Third on mobile, Bottom-Left on desktop) */}
          <div className="order-3 lg:order-none lg:col-start-1 lg:row-start-2 flex flex-col justify-center">
            <ContactNewsletter />
          </div>
        </ComponentLayout>
      </div>
    </section>
  );
}
