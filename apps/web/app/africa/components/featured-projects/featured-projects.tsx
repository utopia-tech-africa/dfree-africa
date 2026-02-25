"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ComponentLayout from "@/components/component-layout";
import { Title } from "@/components/title-and-subtitle/title";
import { Subtitle } from "@/components/title-and-subtitle/subtitle";
import { cn } from "@/lib/utils";
import type { ProjectForUI } from "@/lib/sanity";
import { FeaturedProjectCard } from "./featured-project-card";
import Image from "next/image";
import { DefreeLogoBg } from "@/assets";

type FeaturedProjectsProps = {
  projects?: ProjectForUI[];
  title?: string;
  subtitle: string;
  description: string;
  href: string;
};

export const FeaturedProjects = ({
  projects,
  title,
  subtitle,
  description,
  href,
}: FeaturedProjectsProps) => {
  const featuredProjects = projects?.filter((p) => p.featured);

  return (
    <ComponentLayout className=" mt-[90px] md:mt-25 lg:mt-[180px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        {/* LEFT COLUMN — Sticky Content */}
        <div className="relative lg:sticky lg:top-24 h-fit flex flex-col gap-2">
          {/* Background image */}
          <div className="absolute -z-10 md:-left-10 w-full md:w-[60%]">
            <Image
              src={DefreeLogoBg}
              alt="Hero background"
              className="object-left"
              priority
            />
          </div>

          {title && <Title text={title} />}

          <Subtitle text={subtitle} />

          <p className="text-neutral-800 leading-tight max-w-lg  text-lg">
            {description}
          </p>

          <Link
            href={href}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "w-fit mt-2 hidden lg:flex",
            )}
          >
            View all projects
          </Link>
        </div>

        {/* RIGHT COLUMN — Scrollable Cards */}
        <div className="flex flex-col gap-10">
          {featuredProjects?.map((project) => (
            <FeaturedProjectCard
              className="h-140"
              key={
                "_id" in project && typeof project._id === "string"
                  ? project._id
                  : String(project.title)
              }
              title={project.title}
              description={project.description}
              country={project.country}
              previewMedia={project.previewMedia}
              slug={project.slug}
            />
          ))}
        </div>

        <Link
          href={href}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-fit mt-2 lg:hidden mx-auto",
          )}
        >
          View all projects
        </Link>
      </div>
    </ComponentLayout>
  );
};
