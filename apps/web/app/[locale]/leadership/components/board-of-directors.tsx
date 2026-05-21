import React from "react";
import { getTranslations } from "next-intl/server";

interface BoardMember {
  name: string;
  role: string;
}

export const BoardOfDirectors = async () => {
  const t = await getTranslations("home.leadership");
  const members = t.raw("members") as BoardMember[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 mx-auto px-4">
      {members.map((member, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <h3 className="text-lg md:text-xl font-bold text-neutral-1000 dark:text-neutral-100 font-montserrat">
            {member.name}
          </h3>
          <p className="text-sm text-neutral-800 dark:text-neutral-400 mt-2 leading-relaxed max-w-94 font-poppins">
            {member.role}
          </p>
        </div>
      ))}
    </div>
  );
};
