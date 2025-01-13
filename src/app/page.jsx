import Image from "next/image";
import Link from "next/link";

/* gmbh placeholder image */
import gmbhPlaceholder from "@assets/landing/gmbh-placeholder.jpeg";

/* Product thumbnails */
import industrialLightingThumbnail from "@assets/landing/industrial-lighting-thumbnail.jpeg";
import commercialLightingThumbnail from "@assets/landing/commercial-lighting-thumbnail.jpeg";
import landscapeLightingThumbnail from "@assets/landing/landscape-lighting-thumbnail.jpeg";

/* Industries placeholder images */
import heroPlaceholder from "@assets/landing/hero-placeholder.jpeg";
import industriesPlaceholder1 from "@assets/landing/industry-placeholder-1.jpeg";

/* helper components */
const SectionTitle = ({ title }) => {
  return (
    <h1 className="text-3xl font-bebasNeue uppercase sm:text-5xl">{title}</h1>
  );
};

const SectionDescription = ({ description }) => {
  return <p className="text-xs text-center">{description}</p>;
};

const CtaButton = ({ name, href, className = "text-black border-black" }) => {
  return (
    <button className={`${className} px-8 py-2 text-xs border rounded-full`}>
      <Link href={href} className="w-full h-full">
        {name}
      </Link>
    </button>
  );
};

const ProductCard = ({ title, cta, thumbnail }) => {
  return (
    <div className="relative h-72 flex flex-col items-center gap-2 sm:h-80 sm:flex-1 lg:h-96">
      <Image
        src={thumbnail}
        alt={title}
        className="h-full rounded-lg object-cover"
      />
      <div className="absolute top-0 left-0 w-full py-6 flex flex-col gap-4 justify-center items-center">
        <h1 className="text-lg text-white text-center">{title}</h1>
        <CtaButton name={cta.text} href={cta.href} className="text-white" />
      </div>
    </div>
  );
};

/* sections */

// TODO: Update hero placeholder image with a background video
// Hero section
const Hero = ({ title, cta }) => {
  return (
    <section className="relative text-white text-center">
      <Image
        src={heroPlaceholder}
        alt="hero placeholder"
        className="w-full object-cover object-bottom brightness-75"
      />
      <div className="absolute inset-0 px-12 py-16 flex flex-col gap-6 items-center justify-center sm:px-48 sm:py-32 xl:py-72">
        <h1 className="text-3xl font-bebasNeue uppercase sm:text-5xl">
          {title}
        </h1>
        <CtaButton name={cta.name} href={cta.href} className="border-white" />
      </div>
    </section>
  );
};

// LyteMaster GMBH section
// TODO: Update LyteMaster GMBH placeholder image with a video
const AboutSection = ({ title, description, cta, images }) => {
  return (
    <section
      id="about"
      className="h-max px-8 py-8 flex flex-col justify-center items-center gap-6 bg-white text-black sm:px-16 sm:py-16"
    >
      <div className="flex flex-col items-center gap-2 sm:px-16 lg:px-32">
        <h2 className="text-center text-xl sm:text-2xl">Welcome to</h2>
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>
      <CtaButton name={cta.text} href={cta.href} />
      <Image
        src={images[0]}
        alt="LyteMaster GMBH"
        className="h-72 rounded-lg object-cover sm:h-96"
      />
    </section>
  );
};

const ProductsSection = ({ title, products }) => {
  return (
    <section
      id="products"
      className="h-max px-12 py-8 flex flex-col justify-center items-center gap-6 bg-white text-black sm:px-24 sm:py-16"
    >
      <div className="flex flex-col items-center gap-2">
        <SectionTitle title={title} />
      </div>
      <div className="h-max flex flex-col items-center gap-4 sm:flex-row">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            cta={product.cta}
            thumbnail={product.thumbnail}
          />
        ))}
      </div>
    </section>
  );
};

const IndustriesSection = ({ title, description, images, cta }) => {
  return (
    <section
      id="industries"
      className="h-max px-8 py-8 flex flex-col justify-center items-center gap-6 bg-white text-black sm:px-16 sm:py-16"
    >
      <div className="px-2 flex flex-col items-center gap-2 text-center sm:px-16 lg:px-32">
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 sm:flex-row">
        {images.map((industry, index) => (
          <Image
            key={index}
            src={industry}
            alt="Industries"
            className="aspect-square rounded-lg object-cover flex-1 sm:w-1/12"
          />
        ))}
      </div>
      <CtaButton name={cta.text} href={cta.href} />
    </section>
  );
};

const ContactSection = ({ title, description, cta }) => {
  return (
    <section id="contact" className="relative h-64 text-white lg:h-96">
      <Image
        src={commercialLightingThumbnail}
        alt="commercial lighting"
        className="w-full h-full object-cover object-center brightness-[65%]"
      />
      <div className="absolute inset-0 w-full h-full px-12 py-16 flex flex-col justify-center items-start gap-6 sm:px-24 sm:py-20">
        <div className="w-52 flex flex-col justify-center items-start gap-2 sm:w-80">
          <SectionTitle title={title} />
          <p className="text-xs">{description}</p>
        </div>
        <CtaButton
          name={cta.text}
          href={cta.href}
          className="text-white border-white"
        />
      </div>
    </section>
  );
};

/* data */
const heroSectionData = {
  title: "World class range of lighting solutions",
  cta: {
    name: "View More",
    href: "#", // TODO: Update this link
  },
};

const productsSectionData = {
  title: "Our Products",
  products: [
    {
      title: "Commercial Lighting",
      cta: {
        text: "See More",
        href: "/products/commercial",
      },
      thumbnail: commercialLightingThumbnail,
    },
    {
      title: "Industrial Lighting",
      cta: {
        text: "See More",
        href: "/products/industrial",
      },
      thumbnail: industrialLightingThumbnail,
    },
    {
      title: "Landscape Lighting",
      cta: {
        text: "See More",
        href: "/products/landscape",
      },
      thumbnail: landscapeLightingThumbnail,
    },
  ],
};

const aboutSectionData = {
  title: "Lyte Master GMBH",
  description:
    "Driven by the increasing demand for energy efficient lighting, Lyte Master GmbH has, Since the late 2000s been in the LED lighting market and more recently taking advantage of the rapid developments in LED technology to bring you a world class range of LED Lighting Solutions.",
  cta: {
    text: "About us",
    href: "/about-us",
  },
  images: [gmbhPlaceholder],
};

const industriesSectionData = {
  title: "Industries we serve",
  description:
    "Driven by the increasing demand for energy efficient lighting, Lyte Master GmbH has, Since the late 2000s been in the LED lighting market and more recently taking advantage of the rapid developments in LED technology to bring you a world class range of LED Lighting Solutions.",
  images: [
    gmbhPlaceholder,
    heroPlaceholder,
    landscapeLightingThumbnail,
    industriesPlaceholder1,
  ],
  cta: {
    text: "See More",
    href: "#", // TODO: Update this link
  },
};

const contactSectionData = {
  title: "Would you like to discuss a project?",
  description:
    "Driven by the increasing demand for energy efficient lighting, Lyte Master GmbH has, Since the late 2000s been in the LED lighting.",
  cta: {
    text: "Contact Us",
    href: "/contact",
  },
};

/* landing page */
export default function Landing() {
  return (
    <>
      <Hero {...heroSectionData} />
      <AboutSection {...aboutSectionData} />
      <ProductsSection {...productsSectionData} />
      <IndustriesSection {...industriesSectionData} />
      <ContactSection {...contactSectionData} />
    </>
  );
}
