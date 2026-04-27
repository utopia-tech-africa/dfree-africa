import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface ProjectCardProps {
  title: string;
  slug: string;
  description: string;
  country: string;
  previewMedia: {
    type: string;
    url: string;
  };
  isOngoing: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  slug,
  description,
  country,
  previewMedia,
  isOngoing,
  className,
}) => {
  const t = useTranslations("africa.projects");
  const router = useRouter();
  const href = `/africa/projects/${slug}`;
  const prefetchDetail = useCallback(() => {
    router.prefetch(href);
  }, [router, href]);

  return (
    <div
      className={cn(
        "relative w-full max-w-140 h-130 rounded-lg overflow-hidden",
        className,
      )}
    >
      {/* Ongoing Badge */}
      {isOngoing && (
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant={"secondary"}
            className="rounded-sm p-2 uppercase text-primary-500 text-sm font-bold tracking-wide ring-2 ring-primary-100"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500/50"></span>
            </span>
            Ongoing
          </Button>
        </div>
      )}

      {/* Background Media */}
      {previewMedia.type === "image" ? (
        <Image
          src={previewMedia.url}
          alt={title}
          width={400}
          height={600}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          src={previewMedia.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Bottom Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent h-1/2 bottom-0 top-auto" />

      {/* Country Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Button className="p-3">{country}</Button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 z-10 p-6 flex flex-col gap-2 text-white h-[60%] justify-end">
        <h3 className="font-bold text-xl font-montserrat tracking-wide leading-6">
          {title}
        </h3>

        <p className="text-[16px] text-white/90 line-clamp-3 leading-5">
          {description}
        </p>

        <Link
          href={href}
          prefetch
          onMouseEnter={prefetchDetail}
          onFocus={prefetchDetail}
        >
          <Button
            icon={<MdKeyboardDoubleArrowRight className="size-7" />}
            variant="ghost"
            className="w-fit mt-3 font-normal"
            size={"lg"}
          >
            {t("readMore")}
          </Button>
        </Link>
      </div>
    </div>
  );
};
