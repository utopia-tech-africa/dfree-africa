import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main
      className={cn("pt-16 md:pt-[72px] min-h-screen", className)}
      role="main"
    >
      {children}
    </main>
  );
}
