import Image from "next/image";
import { ProjectDetailForUI } from "@/lib/sanity/projects";
import { PageTitle } from "@/components/page-title/page-title";

type ProjectHeaderProps = { project: ProjectDetailForUI };

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { title, country, featured, previewMedia } = project;

  return (
    <section className="space-y-2 sm:space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3 flex-wrap">
        <PageTitle text={title} />
      </div>

      {/* Preview Media */}
      <div className="relative w-full aspect-video rounded-md overflow-hidden bg-neutral-800">
        {previewMedia.type === "image" ? (
          <Image
            src={previewMedia.url}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <video
            src={previewMedia.url}
            className="w-full h-full object-cover"
            controls
          />
        )}
      </div>
    </section>
  );
};
