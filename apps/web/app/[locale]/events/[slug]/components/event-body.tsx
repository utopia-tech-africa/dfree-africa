import { customPortableTextComponents } from "@/components/portable-text/custom-portable-text-components";
import { EventDetailForUI } from "@/lib/sanity/events";
import { PortableText } from "next-sanity";
import type { ComponentProps } from "react";

type EventBodyProps = { event: EventDetailForUI };
type PortableTextValue = ComponentProps<typeof PortableText>["value"];

export const EventBody = ({ event }: EventBodyProps) => {
  const { details } = event;
  const hasDetails = Array.isArray(details) && details.length > 0;

  if (!hasDetails) return null;

  return (
    <section>
      <div className="prose prose-neutral max-w-none">
        <PortableText
          value={details as PortableTextValue}
          components={customPortableTextComponents}
        />
      </div>
    </section>
  );
};
