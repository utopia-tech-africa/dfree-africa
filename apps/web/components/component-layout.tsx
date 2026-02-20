import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const ComponentLayout = ({ children, className }: Props) => {
  return (
    <section
      className={cn(
        "max-w-360 w-full px-4 md:px-10 lg:px-20 mx-auto",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default ComponentLayout;
