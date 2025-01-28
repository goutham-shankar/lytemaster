/* gmbh placeholder image */
import Image from "next/image";
import gmbhPlaceholder from "@assets/landing/gmbh-placeholder.jpeg";
import { bento } from "@components/projects/bentoGrid";

/* Product thumbnails */
import industrialLightingThumbnail from "@assets/landing/industrial-lighting-thumbnail.jpeg";
import commercialLightingThumbnail from "@assets/landing/commercial-lighting-thumbnail.jpeg";
import landscapeLightingThumbnail from "@assets/landing/landscape-lighting-thumbnail.jpeg";
import bentoThumbnail from "@assets/landing/bento-thumbnail.jpeg";

/* Industries placeholder images */
import heroPlaceholder from "@assets/landing/hero-placeholder.jpeg";

export const placeholderImages = {
  bento: bentoThumbnail.src,
  about: gmbhPlaceholder,
  industries: heroPlaceholder,
  commercial: commercialLightingThumbnail,
  industrial: industrialLightingThumbnail,
  landscape: landscapeLightingThumbnail,
  hero: heroPlaceholder,
};

/* data */
export const projectsData = {
  overviewSection: {
    title: "Projects",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
  },

  projects: [
    {
      tag: "commercial",
      title: "Commercial Projects",
      cta: {
        name: "Load More",
        href: "#",
      },
      projects: [
        {
          name: "Forum Showroom",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Beach Bar Restaurant",
          location: "Jumeirah, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Cafe Capuchino",
          location: "New York, USA",
          image: {
            src: placeholderImages.bento,
            alt: "New York, USA",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Glicerin Bay Office",
          location: "London, UK",
          image: {
            src: placeholderImages.bento,
            alt: "London, UK",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Dune Conference Hall",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Sea Restaurant",
          location: "Tokyo, Japan",
          image: {
            src: placeholderImages.bento,
            alt: "Tokyo, Japan",
          },
          href: "#",
          className: bento.sm,
        },
      ],
    },

    {
      tag: "industrial",
      title: "Industrial Projects",
      cta: {
        name: "Load More",
        href: "#",
      },
      projects: [
        {
          name: "Forum Showroom",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Beach Bar Restaurant",
          location: "Jumeirah, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Cafe Capuchino",
          location: "New York, USA",
          image: {
            src: placeholderImages.bento,
            alt: "New York, USA",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Glicerin Bay Office",
          location: "London, UK",
          image: {
            src: placeholderImages.bento,
            alt: "London, UK",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Dune Conference Hall",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.md,
        },
      ],
    },

    {
      tag: "landscape",
      title: "Landscape Projects",
      cta: {
        name: "Load More",
        href: "#",
      },
      projects: [
        {
          name: "Forum Showroom",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.lg,
        },
        {
          name: "Beach Bar Restaurant",
          location: "Jumeirah, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Cafe Capuchino",
          location: "New York, USA",
          image: {
            src: placeholderImages.bento,
            alt: "New York, USA",
          },
          href: "#",
          className: bento.sm,
        },
        {
          name: "Glicerin Bay Office",
          location: "London, UK",
          image: {
            src: placeholderImages.bento,
            alt: "London, UK",
          },
          href: "#",
          className: bento.lg,
        },

        {
          name: "Dune Conference Hall",
          location: "Dubai, UAE",
          image: {
            src: placeholderImages.bento,
            alt: "Dubai, UAE",
          },
          href: "#",
          className: bento.md,
        },
      ],
    },
  ],
};

export const landingData = {
  heroSection: {
    title: (
      <>
        World class range of <br /> lighting solutions
      </>
    ),
    cta: {
      name: "View More",
      href: "#", // TODO: Update this link
    },
  },

  aboutSection: {
    title: ["Innovative technologies", "with care for people"],
    description:
      "Driven by the increasing demand for energy efficient lighting, Lyte Master GmbH has, Since the late 2000s been in the LED lighting market and more recently taking advantage of the rapid developments in LED technology to bring you a world class range of LED Lighting Solutions.",
    cta: {
      text: "About us",
      href: "#",
    },
    images: [
      placeholderImages.about,
      placeholderImages.about,
      placeholderImages.about,
    ],
  },

  productsSection: {
    title: "What we offer",
    description:
      "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
    products: [
      {
        title: "Commercial Lighting",
        description:
          "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
        cta: {
          text: "See More",
          href: "#",
        },
        thumbnail: placeholderImages.commercial,
        number_of_products: 23,
        highlight: {
          href: "#",
          text: "See More",
        },
      },
      {
        title: "Industrial Lighting",
        description:
          "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
        cta: {
          text: "See More",
          href: "#",
        },
        thumbnail: placeholderImages.industrial,
        number_of_products: 15,
      },
      {
        title: "Landscape Lighting",
        description:
          "Lorem ipsum dolor sit amet consectetur. Mi molestie amet sed eget nunc blandit. Convallis dui tincidunt venenatis aenean vitae dictum.",
        cta: {
          text: "See More",
          href: "#",
        },
        thumbnail: placeholderImages.landscape,
        number_of_products: 14,
      },
    ],
    productsScroll: [
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
      { text: "Lighting Solutions" },
    ],
  },

  howWeWorkSection: {
    title: "How we work",
    description:
      "We work with absolute professionalism to deliver you lights with the perfect quality",
    cta: {
      text: "Order now",
      href: "#",
    },
    highlights: [
      {
        text: "Lorem ipsum dolor sit amet consectetur",
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur",
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur",
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur",
      },
    ],
  },
  recentWorksSection: {
    title: "Our recent works",
    projects: projectsData.projects[0].projects,
  },

  newsletterSection: {
    title: (
      <span>
        Join our newsletter to stay up to date with <b>all things lighting</b>.
      </span>
    ),
    cta: {
      text: "Subscribe",
    },
  },

  contactSection: {
    title: "Would you like to discuss a project?",
    description:
      "Driven by the increasing demand for energy efficient lighting, Lyte Master GmbH has, Since the late 2000s been in the LED lighting.",
    cta: {
      text: "Contact Us",
      href: "#",
    },
  },
};
