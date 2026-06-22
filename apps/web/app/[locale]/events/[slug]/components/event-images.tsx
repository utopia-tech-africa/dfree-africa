import Image from "next/image";
import { EventDetailForUI } from "@/lib/sanity/events";

type EventImagesProps = { event: EventDetailForUI };

const imageClassName = "object-cover object-top";

export const EventImages = ({ event }: EventImagesProps) => {
  const { additionalImages } = event;

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
                  alt={`Event image ${index + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className={imageClassName}
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
                alt={`Event image ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={imageClassName}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
