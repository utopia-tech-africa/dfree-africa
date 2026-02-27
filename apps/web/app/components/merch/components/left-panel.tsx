"use client"; // this component is simple but may contain interactive elements in future

import { Button } from "@/components/ui/button";

const LeftPanel = () => {
  return (
    <div className="flex flex-col items-start gap-5 md:w-[30%] shrink-0">
      <p className="font-montserrat font-bold text-neutral-100 tracking-wide text-base leading-[150%]">
        Merch
      </p>

      <h2
        className="font-montserrat font-bold text-neutral-100 leading-tight"
        style={{ fontSize: "clamp(22px, 3vw, 32px)" }}
      >
        Browse our <br /> bookstore
      </h2>

      <p className="text-neutral-400 leading-relaxed">
        Empower your journey with meaningful products that drive change.
      </p>

      <Button
        variant="secondary"
        size="lg"
        className="p-6 mt-2 text-lg text-primary-500"
      >
        Visit store
      </Button>
    </div>
  );
};

export default LeftPanel;
