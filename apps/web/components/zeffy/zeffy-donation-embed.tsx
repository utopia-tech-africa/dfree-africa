"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ZeffyDonationEmbedProps = {
  src: string;
  title: string;
  className?: string;
  minHeight?: number;
};

export function ZeffyDonationEmbed({
  src,
  title,
  className,
  minHeight = 640,
}: ZeffyDonationEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      style={{ minHeight }}
    >
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      ) : null}

      <iframe
        key={src}
        src={src}
        title={title}
        className={cn(
          "block h-full w-full border-0 transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        style={{ minHeight }}
        scrolling="yes"
        allow="payment *"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
