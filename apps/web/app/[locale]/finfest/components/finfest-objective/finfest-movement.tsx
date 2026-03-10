import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import React from "react";

const FinfestMovement = () => {
  return (
    <ComponentLayout className="flex flex-col md:items-center md:justify-center gap-6 md:text-center my-20 ">
      <Title text="Movement" />
      <p className="font-poppins text-2xl text-neutral-1000 md:text-3xl lg:text-[32px]  font-bold leading-[120%]">
        FinFE$T is the event that offers you real-time access to various
        industry professionals who provide you with economic solutions and
        tools. From resource fairs, masterclasses and workshops to job fairs,
        FinFE$T empowers you to take actionable steps towards financial freedom.
      </p>
    </ComponentLayout>
  );
};

export default FinfestMovement;
