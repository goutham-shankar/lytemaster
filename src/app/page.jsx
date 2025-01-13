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
  return <h1 className="text-5xl font-bebasNeue uppercase">{title}</h1>;
};

const SectionDescription = ({ description }) => {
  return <p className="text-xs text-center">{description}</p>;
};

const CtaButton = ({ name, href, className = "" }) => {
  return (
    <button className={className}>
      <Link href={href} className="px-8 py-2 border rounded-full">
        {name}
      </Link>
    </button>
  );
};

const ProductCard = ({ title, ctaText, ctaHref, thumbnail }) => {
  return (
    <div className="relative h-full flex-1 flex flex-col items-center gap-2">
      <Image
        src={thumbnail}
        alt={title}
        className="h-full rounded-lg object-cover"
      />
      <div className="absolute top-0 left-0 w-full py-6 flex flex-col gap-4 justify-center items-center">
        <h1 className="text-lg text-white text-center">{title}</h1>
        <CtaButton name={ctaText} href={ctaHref} className="text-white" />
      </div>
    </div>
  );
};

/* sections */

// TODO: Update hero placeholder image with a background video
// Hero section
const Hero = () => {
  return (
    <section className="h-[30rem] flex flex-col justify-center items-center gap-4 bg-[url('../assets/landing/hero-placeholder.jpeg')] bg-cover bg-center text-white">
      <h1 className="w-2/3 text-5xl font-bebasNeue uppercase text-center">
        World class range of lighting solutions
      </h1>
      <CtaButton name="View More" href="#" />
    </section>
  );
};

// LyteMaster GMBH section
// TODO: Update LyteMaster GMBH placeholder image with a video
const AboutSection = ({ title, description, cta, images }) => {
  return (
    <section
      id="about"
      className="h-[50rem] flex flex-col justify-center items-center gap-6 bg-white text-black"
    >
      <div className="w-2/3 flex flex-col items-center gap-2">
        <h2 className="text-center text-2xl ">Welcome to</h2>
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>
      <CtaButton name={cta.text} href={cta.href} />
      <Image
        src={images[0]}
        alt="LyteMaster GMBH"
        className="w-4/5 h-96 rounded-lg object-cover"
      />
    </section>
  );
};

const ProductsSection = ({ title, products }) => {
  return (
    <section
      id="products"
      className="h-96 flex flex-col justify-center items-center gap-6 bg-white text-black"
    >
      <div className="w-2/3 flex flex-col items-center gap-2">
        <SectionTitle title={title} />
      </div>
      <div className="w-4/5 h-80 flex items-center gap-5">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            ctaText={product.ctaText}
            ctaHref={product.ctaHref}
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
      className="h-[34rem] flex flex-col justify-center items-center gap-6 bg-white text-black"
    >
      <div className="w-2/3 flex flex-col items-center gap-2">
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>
      <div className="flex justify-center items-center gap-2">
        {images.map((industry, index) => (
          <Image
            key={index}
            src={industry}
            alt="Industries"
            className="w-48 aspect-square rounded-lg object-cover"
          />
        ))}
      </div>
      <CtaButton name={cta.text} href={cta.href} />
    </section>
  );
};

const ContactSection = ({ title, description, cta }) => {
  return (
    <section className="h-80 px-24 flex flex-col justify-center items-start gap-6 bg-[url('../assets/landing/commercial-lighting-thumbnail.jpeg')] bg-cover bg-center text-white">
      <div className="w-80 flex flex-col justify-center items-start gap-2">
        <SectionTitle title={title} />
        <p className="text-xs">{description}</p>
      </div>
      <CtaButton name={cta.text} href={cta.href} />
    </section>
  );
};

/* data */
const productsSectionData = {
  title: "Our Products",
  products: [
    {
      title: "Commercial Lighting",
      ctaText: "See More",
      ctaHref: "#",
      thumbnail: commercialLightingThumbnail,
    },
    {
      title: "Industrial Lighting",
      ctaText: "See More",
      ctaHref: "#",
      thumbnail: industrialLightingThumbnail,
    },
    {
      title: "Landscape Lighting",
      ctaText: "See More",
      ctaHref: "#",
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
    href: "#",
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
    href: "#",
  },
};

const contactSectionData = {
  title: "Would you like to discuss a project?",
  description:
    "Driven by the increasing demand for energy efficient lighting, Lyte Master GmbH has, Since the late 2000s been in the LED lighting.",
  cta: {
    text: "Contact Us",
    href: "#",
  },
};

/* landing page */
export default function Landing() {
  return (
    <>
      <Hero />
      <AboutSection {...aboutSectionData} />
      <ProductsSection {...productsSectionData} />
      <IndustriesSection {...industriesSectionData} />
      <ContactSection {...contactSectionData} />
    </>
  );
}
