import { AfricaBanner } from "@/components/banners";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const AfricaLayout = ({ children }: Props) => {
  return (
    <section className="w-full">
      <div className="flex flex-col w-full mb-30">{children}</div>
      <AfricaBanner />
    </section>
  );
};

export default AfricaLayout;
