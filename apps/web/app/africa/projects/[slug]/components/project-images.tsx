import Image from "next/image";
import { ProjectDetailForUI } from "@/lib/sanity/projects";

type ProjectImagesProps = { project: ProjectDetailForUI };

export const ProjectImages = ({ project }: ProjectImagesProps) => {
  const { additionalImages } = project;

  if (!additionalImages?.length) return null;

  const count = additionalImages.length;

  return (
    <section className="space-y-10">
      <div
        className={`
          grid gap-6
          grid-cols-1
          ${count === 2 ? "sm:grid-cols-2" : ""}
          ${count === 3 ? "lg:grid-cols-3 lg:grid-rows-2" : ""}
          ${count > 3 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}
        `}
      >
        {additionalImages.slice(0, 3).map((img, index) => {
          // Special layout ONLY for 3 images on desktop
          if (count === 3 && index === 0) {
            return (
              <div
                key={index}
                className="
                  relative
                  aspect-video
                  lg:aspect-auto
                  lg:row-span-2
                  lg:col-span-2
                  lg:min-h-125
                  rounded-lg
                  overflow-hidden
                  bg-gray-100
                "
              >
                <Image
                  src={img}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            );
          }

          return (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
            >
              <Image
                src={img}
                alt={`Project image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
