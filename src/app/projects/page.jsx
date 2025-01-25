"use client";

import React from "react";

import CtaButton from "@components/common/ctaButton";
import BentoGrid, { bento } from "@components/projects/bentoGrid";
import Filters from "@components/projects/filters";
import useProjectsStore from "@/store/projects";
import { projectsData } from "@assets/placeholders";

const filters = ["Commercial", "Industrial", "Landscape"];

const SectionTitle = ({ title }) => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-2">
      <h1 className="w-min text-2xl text-left font-bold text-nowrap sm:text-4xl">
        {title}
        <span className="block w-1/3 h-0.5 mt-1 bg-black"></span>
      </h1>
    </div>
  );
};

const OverviewSection = ({ title, description }) => {
  return (
    <section className="w-full h-max px-4 py-8 flex flex-col justify-center items-center gap-4 bg-white text-black sm:px-12">
      <h1 className="w-full text-4xl text-left font-bold">{title}</h1>
      <p className="">{description}</p>
      <Filters filters={filters} />
    </section>
  );
};

const ProjectSection = ({ title, cta, projects }) => {
  return (
    <section className="w-full h-max px-4 py-8 flex flex-col justify-center items-center gap-6 bg-white text-black sm:px-12">
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
