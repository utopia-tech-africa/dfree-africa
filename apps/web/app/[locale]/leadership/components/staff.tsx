import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface StaffMember {
  name: string;
  role: string;
  image: string;
}

export const Staff = async () => {
  const t = await getTranslations("home.leadership.staff");
  const members = t.raw("members") as StaffMember[];

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-1000 dark:text-neutral-100 font-montserrat tracking-tight">
          {t("title")}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 mx-auto px-4 max-w-7xl">
        {members.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative w-full aspect-square max-w-82.5 h-105 overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 shadow-sm transition-all duration-500 hover:shadow-md hover:-translate-y-1">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 size-full"
              />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-neutral-1000 dark:text-neutral-100 font-montserrat mt-5 ">
              {member.name}
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed max-w-72 font-poppins">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
