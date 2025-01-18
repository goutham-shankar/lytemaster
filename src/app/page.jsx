"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowRight, BellRing } from "lucide-react";
import { useState } from "react";
import CtaButton from "@components/common/ctaButton";

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
const SectionTitle = ({ title, className = "" }) => {
  return (
    <h1
      className={`${className} text-3xl font-bebasNeue uppercase sm:text-5xl xl:text-7xl`}
    >
      {title}
    </h1>
  );
};

const SectionDescription = ({ description, className = "text-center" }) => {
  return (
    <p className={`${className} text-xs lg:text-lg xl:text-2xl`}>
      {description}
    </p>
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
        <CtaButton
          name={cta.text}
          href={cta.href}
          className="text-white hover:bg-white hover:text-black"
        />
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
      <div className="absolute inset-0 py-16 flex flex-col gap-6 items-center justify-center sm:py-32 xl:py-72">
        <SectionTitle title={title} className="text-nowrap" />
        <CtaButton
          name={cta.name}
          href={cta.href}
          className="border-white hover:bg-white hover:text-black"
        />
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
        <SectionDescription description={"Welcome to"} />
        <SectionTitle title={title} />
        <SectionDescription description={description} />
      </div>
      {/* <CtaButton name={cta.text} href={cta.href} /> */}
      <CtaButton name={cta.text} href="#" />
      <Image
        src={images[0]}
        alt="LyteMaster GMBH"
        className="w-full h-72 rounded-lg object-cover sm:h-96"
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
      {/* <CtaButton name={cta.text} href={cta.href} /> */}
      <CtaButton name={cta.text} href="#" />
    </section>
  );
};

const Newsletter = ({ title, caption, description, cta, disclaimer }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send email to backend
    setEmail("");
  };

  return (
    <section className="h-max py-8 flex flex-col justify-center items-center gap-6 bg-white text-black sm:px-24 sm:py-16">
      <SectionTitle title={title} />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="bg-white p-8 text-black flex flex-col justify-center border-b sm:border-r sm:border-b-0">
                <BellRing className="w-12 h-12 mb-6 mx-auto text-black sm:mx-0" />
                <h2 className="text-xl font-bold mb-4 sm:text-3xl">
                  {caption}
                </h2>
                <div className="w-16 h-0.5 bg-black mb-6"></div>
                <p className="text-sm text-gray-600 sm:text-md">
                  {description}
                </p>
              </div>

              {/* Right Form */}
              <div className="p-8 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:ring-0"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center group"
                  >
                    {cta.text}
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    {disclaimer}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactSection = ({ title, description, cta }) => {
  return (
    <section
      id="contact"
      className="relative h-64 text-white lg:h-96 xl:h-[30rem] transition-transform duration-500"
    >
      <Image
        src={commercialLightingThumbnail}
        alt="commercial lighting"
        className="w-full h-full object-cover object-center brightness-[65%]"
      />
      <div className="absolute inset-0 w-full h-full px-12 py-16 flex flex-col justify-center items-start gap-6 sm:px-24 sm:py-20">
        <div className="w-full flex flex-col justify-center items-start gap-2 sm:w-2/3 lg:w-1/2">
          <SectionTitle title={title} />
          <SectionDescription description={description} className="text-left" />
        </div>
        <CtaButton
          name={cta.text}
          // href={cta.href}
          href="#"
          className="text-white border-white hover:bg-white hover:text-black"
        />
      </div>
    </section>
  );
};

/* data */
const heroSectionData = {
  title: (
    <>
      World class range of lighting <br /> solutions
    </>
  ),
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

const newsletterSectionData = {
  title: "Newsletter",
  caption: "Stay Illuminated",
  description:
    "Join our newsletter and stay updated with the latest news and insights.",
  cta: {
    text: "Subscribe",
    href: "/newsletter",
  },
  disclaimer:
    "By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.",
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
      <Newsletter {...newsletterSectionData} />
      <ContactSection {...contactSectionData} />
    </>
  );
}
