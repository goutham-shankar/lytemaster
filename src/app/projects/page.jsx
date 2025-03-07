"use client";

import React from "react";

import CtaButton from "@components/common/ctaButton";
import BentoGrid, { bento } from "@components/projects/bentoGrid";
import Filters from "@components/projects/filters";
import useProjectsStore from "@/store/projects";
import { projectsData } from "@assets/placeholders";
import { Heading, Paragraph } from "@components/common/text";

const filters = ["Commercial", "Industrial", "Landscape"];

const SectionTitle = ({ title }) => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-2">
      <h1 className="w-min text-xl text-left font-bold text-nowrap sm:text-2xl lg:text-3xl xl:text-4xl">
        {title}
        <span className="block w-1/3 h-0.5 mt-1 bg-black"></span>
      </h1>
    </div>
  );
};

const OverviewSection = ({ title, description }) => {
  return (
    <section className="w-full h-max mt-16 px-8 py-4 flex flex-col justify-center items-left gap-4 text-black sm:px-16 sm:py-8 sm:gap-6 md:mt-20 lg:gap-8 lg:mt-28 xl:gap-12">
      <Heading title={title} />
      <Paragraph description={description} className="text-left sm:w-1/2" />
      <Filters filters={filters} />
    </section>
  );
};

const ProjectSection = ({ title, cta, projects }) => {
  return (
    <section className="w-full h-max px-8 py-4 flex flex-col justify-center items-center gap-6 text-black sm:px-16 sm:py-8">
      <SectionTitle title={title} />
      <BentoGrid items={projects} />
      <CtaButton name={cta.name} href={cta.href} />
    </section>
  );
};

export default function Projects() {
  const { filters } = useProjectsStore();

  return (
    <>
      <OverviewSection {...projectsData.overviewSection} />
      {projectsData.projects
        .filter((project) => filters.includes(project.tag))
        .map((project, index) => (
          <ProjectSection key={index} {...project} />
        ))}
    </>
  );
}
