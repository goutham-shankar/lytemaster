"use client";

import React from "react";

import CtaButton from "@components/common/ctaButton";
import BentoGrid, { bento } from "@components/projects/bentoGrid";
import Filters from "@components/projects/filters";
import useProjectsStore from "@/store/projects";

const filters = ["Commercial", "Industrial", "Landscape"];

const SectionTitle = ({ title }) => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-2">
      <h1 className="w-min text-4xl text-left font-bold text-nowrap">
        {title}
        <span className="block w-1/3 h-0.5 mt-1 bg-black"></span>
      </h1>
    </div>
  );
};

const OverviewSection = ({ title, description }) => {
  return (
    <section className="w-full h-max px-12 py-8 flex flex-col justify-center items-center gap-4 bg-white text-black ">
      <h1 className="w-full text-4xl text-left font-bold">{title}</h1>
      <p className="">{description}</p>
      <Filters filters={filters} />
    </section>
  );
};

const ProjectSection = ({ title, cta, projects }) => {
  return (
    <section className="w-full h-max px-12 py-8 flex flex-col justify-center items-center gap-6 bg-white text-black">
      <SectionTitle title={title} />
      <BentoGrid items={projects} />
      <CtaButton name={cta.name} href={cta.href} />
    </section>
  );
};

const overviewSectionProps = {
  title: "Projects",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
};

const placeholderImage =
  "https://s3-alpha-sig.figma.com/img/4f46/c426/f5ad01f044078edd99945e8bab0f2acc?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XqFXumeLs3RblOTDKJQqAx5yalwXwlVARkkik798K0f~DmrgHfmlf5A0t2ArVdI1yU3snpbByB6v8GUcVXhHrkkircKtl3Z96ZgFXb3jqy~GYL3UrrENPTT1Ee529GN4~sEdWFMS25qGKgvXTv4R0aA97ETAQbxAX4e9cDVQof1wNr94ohEd3Ewy73ky-geukoU1fDtn7-rYJM~MDkIkjPKomGJt50uMJAIk-C3XLHHTHNCdrHW0bzHfIYbTJdouvATOTi5837lJz82Y-8b~RDgc6yJcd2uHJrrfpDxSxIYueIO7Dx05BSBw7tjX35XBMK9hRpIMJD8Z9g~4zoKYeQ__";

const commercialProjects = {
  tag: "commercial",
  title: "Commercial Projects",
  cta: {
    name: "Load More",
    href: "/projects/commercial",
  },
  projects: [
    {
      name: "Forum Showroom",
      location: "Dubai, UAE",
      image: {
        src: placeholderImage,
        alt: "Dubai, UAE",
      },
      href: "/projects/forum-showroom",
      className: bento.lg,
    },
    {
      name: "Beach Bar Restaurant",
      location: "Jumeirah, UAE",
      image: {
        src: placeholderImage,
        alt: "Dubai, UAE",
      },
      href: "/projects/beach-bar-restaurant",
      className: bento.sm,
    },
    {
      name: "Cafe Capuchino",
      location: "New York, USA",
      image: {
        src: placeholderImage,
        alt: "New York, USA",
      },
      href: "/projects/cafe-capuchino",
      className: bento.sm,
    },
    {
      name: "Glicerin Bay Office",
      location: "London, UK",
      image: {
        src: placeholderImage,
        alt: "London, UK",
      },
      href: "/projects/glicerin-bay-office",
      className: bento.lg,
    },
    {
      name: "Dune Conference Hall",
      location: "Dubai, UAE",
      image: {
        src: placeholderImage,
        alt: "Dubai, UAE",
      },
      href: "/projects/dune-conference-hall",
      className: bento.sm,
    },
    {
      name: "Sea Restaurant",
      location: "Tokyo, Japan",
      image: {
        src: placeholderImage,
        alt: "Tokyo, Japan",
      },
      href: "/projects/sea-restaurant",
      className: bento.sm,
    },
  ],
};

const industrialProjects = {
  tag: "industrial",
  title: "Industrial Projects",
  cta: {
    name: "Load More",
    href: "/projects/industrial",
  },
  projects: [
    {
      name: "Forum Showroom",
      location: "Dubai, UAE",
      image: {
        src: placeholderImage,
        alt: "Dubai, UAE",
      },
      href: "/projects/forum-showroom",
      className: bento.sm,
    },
    {
      name: "Beach Bar Restaurant",
      location: "Jumeirah, UAE",
      image: {
        src: placeholderImage,
        alt: "Dubai, UAE",
      },
      href: "/projects/beach-bar-restaurant",
      className: bento.sm,
    },
    {
      name: "Cafe Capuchino",
      location: "New York, USA",
      image: {
        src: placeholderImage,
        alt: "New York, USA",
      },
      href: "/projects/cafe-capuchino",
      className: bento.lg,
    },
    {
      name: "Glicerin Bay Office",
      location: "London, UK",
      image: {
        src: placeholderImage,
        alt: "London, UK",
      },
      href: "/projects/glicerin-bay-office",
      className: bento.lg,
    },
    {
      name: "Dune Conference Hall",
      location: "Dubai, UAE",
      image: {
        src: placeholderImage,
        alt: "Dubai, UAE",
      },
      href: "/projects/dune-conference-hall",
      className: bento.md,
    },
  ],
};

const landscapeProjects = {
  tag: "landscape",
  title: "Landscape Projects",
  cta: {
    name: "Load More",
    href: "/projects/landscape",
  },
  projects: [
    {
      name: "Forum Showroom",
      location: "Dubai, UAE",
      image: {
        src: placeholderImage,
        alt: "Dubai, UAE",
      },
      href: "/projects/forum-showroom",
      className: bento.lg,
    },
    {
      name: "Beach Bar Restaurant",
      location: "Jumeirah, UAE",
      image: {
        src: placeholderImage,
        alt: "Dubai, UAE",
      },
      href: "/projects/beach-bar-restaurant",
      className: bento.sm,
    },
    {
      name: "Cafe Capuchino",
      location: "New York, USA",
      image: {
        src: placeholderImage,
        alt: "New York, USA",
      },
      href: "/projects/cafe-capuchino",
      className: bento.sm,
    },
    {
      name: "Glicerin Bay Office",
      location: "London, UK",
      image: {
        src: placeholderImage,
        alt: "London, UK",
      },
      href: "/projects/glicerin-bay-office",
      className: bento.lg,
    },

    {
      name: "Dune Conference Hall",
      location: "Dubai, UAE",
      image: {
        src: placeholderImage,
        alt: "Dubai, UAE",
      },
      href: "/projects/dune-conference-hall",
      className: bento.md,
    },
  ],
};

const projects = [commercialProjects, industrialProjects, landscapeProjects];

export default function Projects() {
  const { filters } = useProjectsStore();

  return (
    <>
      <OverviewSection {...overviewSectionProps} />
      {projects
        .filter((project) => filters.includes(project.tag))
        .map((project, index) => (
          <ProjectSection key={index} {...project} />
        ))}
    </>
  );
}
