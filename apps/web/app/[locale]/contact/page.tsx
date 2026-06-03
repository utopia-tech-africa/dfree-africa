import Image from "next/image";
import ComponentLayout from "@/components/component-layout";
import { ContactInfo, ContactForm } from "./components";

const imageUrl =
  "https://res.cloudinary.com/dan9camhs/image/upload/v1776351125/031576e6e7fc7d974a347d2ef92814609b299f22_sdvdnm.webp";

const ContactPage = () => {
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
          <ContactInfo />
          <ContactForm />
        </ComponentLayout>
      </div>
    </section>
  );
};

export default ContactPage;
