"use client";

import React, { useState, useEffect } from "react";

import CtaButton from "@components/common/ctaButton";
import BentoGrid, { bento } from "@components/projects/bentoGrid";
import Filters from "@components/projects/filters";
import useProjectsStore from "@/store/projects";
import { projectsData } from "@assets/placeholders";
import { Heading, Paragraph } from "@components/common/text";

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
    </section>
  );
};

const ProjectSection = ({ title, cta, projects }) => {
  return (
    <section className="w-full --h-max px-8 --py-4 flex flex-col justify-center items-center gap-6 text-black sm:px-16 sm:py-8 --bg-red-200 ">
      <SectionTitle title={title} />
      <BentoGrid items={projects} cta={cta} />
    </section>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const { filters } = useProjectsStore(); // Zustand store for selected filters

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Fetched Projects:", responseData);

        let projects_data = [];
        let projects_category = [];

        // Build projects_data and category list
        responseData.forEach((item) => {
          if (!projects_category.includes(item.Lighting_Type)) {
            projects_data.push({
              tag: item.Lighting_Type,
              title: item.Lighting_Type,
              cta: {
                name: "Load More",
                href: "#",
              },
              projects: [],
            });
            projects_category.push(item.Lighting_Type);
          }
        });

        // Insert projects into correct category
        responseData.forEach((project) => {
          const cat_index = projects_category.indexOf(project.Lighting_Type);
          projects_data[cat_index].projects.push({
            name: project.project_name,
            location: project.Project_addr,
            image: {
              src: `${process.env.NEXT_PUBLIC_BASE_URL}/project_image/${project.images?.split(",")[0]}`,
              alt: "",
            },
            href: `/projects/${project.project_id}`,
            className: bento.lg,
          });
        });

        setProjects(projects_data);
        setFilterOptions(projects_category); // Set filters dynamically
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
      });
  }, []);

  return (
    <>
      <OverviewSection {...projectsData.overviewSection} />
      <Filters filters={filterOptions} />
      {projects
        .filter((project) => {
          // if no filters selected, show all
          if (filterOptions.length === 0) return true;
          return filterOptions.includes(project.tag);
        })
        .map((project, index) => (
          <ProjectSection key={index} {...project} />
        ))}
    </>
  );
}
