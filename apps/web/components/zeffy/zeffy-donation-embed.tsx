"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_IFRAME_HEIGHT = 1200;

type ZeffyDonationEmbedProps = {
  src: string;
  title: string;
  className?: string;
  minHeight?: number;
};

function readIframeHeight(data: unknown): number | null {
  if (typeof data === "number" && data > 0) {
    return data;
  }

  if (typeof data !== "object" || data === null) {
    return null;
  }

  const record = data as Record<string, unknown>;
  const candidates = [
    record.height,
    record.frameHeight,
    record.iframeHeight,
    record["iframe-height"],
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "number" && candidate > 0) {
      return candidate;
    }
  }

  return null;
}

export function ZeffyDonationEmbed({
  src,
  title,
  className,
  minHeight = DEFAULT_IFRAME_HEIGHT,
}: ZeffyDonationEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(minHeight);

  useEffect(() => {
    setIsLoaded(false);
    setIframeHeight(minHeight);
  }, [src, minHeight]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes("zeffy.com")) {
        return;
      }

      const nextHeight = readIframeHeight(event.data);

      if (nextHeight != null) {
        setIframeHeight(Math.max(nextHeight, minHeight));
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, [minHeight]);

  const height = Math.max(iframeHeight, minHeight);

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      {!isLoaded ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-neutral-50"
          style={{ height }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      ) : null}

      <iframe
        key={src}
        src={src}
        title={title}
        id="zeffy-form-embed"
        name="zeffy"
        className={cn(
          "block w-full border-0 transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
        )}
        style={{ height, minHeight: height }}
        scrolling="yes"
        allow="payment *"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
