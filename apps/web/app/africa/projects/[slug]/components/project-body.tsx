import { customPortableTextComponents } from "@/components/portable-text/custom-portable-text-components";
import { ProjectDetailForUI } from "@/lib/sanity/projects";
import { PortableText } from "next-sanity";

type ProjectBodyProps = { project: ProjectDetailForUI };

export const ProjectBody = ({ project }: ProjectBodyProps) => {
  const { description, details } = project;

  return (
    <section>
      {/* Rich Content */}
      {details && details.length > 0 && (
        <div className="prose prose-neutral max-w-none">
          <PortableText
            value={details}
            components={customPortableTextComponents}
          />
        </div>
      )}
    </section>
  );
};
