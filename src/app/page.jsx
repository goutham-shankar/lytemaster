"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CtaButton from "@components/common/ctaButton";
import BentoGrid from "@components/projects/bentoGrid";
import ProductsSection from "@components/landing/productsSection";
import Title from "@components/common/title";
import Description from "@components/common/description";

import { placeholderImages, landingData } from "@assets/placeholders";

/* helper components */

const HighlightCard = ({ index, highlight }) => {
  return (
    <li className="flex justify-between items-start gap-4 lg:text-xl xl:text-2xl">
      <span className="text-gray-400">0{index + 1} </span>
      <p>{highlight.text}</p>
    </li>
  );
};

const AboutImages = ({ images }) => {
  return (
    <div className="w-full flex flex-row gap-6">
      {/* Column with two stacked images */}
      <div className="w-1/2 flex flex-col gap-6">
        <Image
          src={images[0]}
          alt="LyteMaster GMBH"
          className="w-full h-auto object-cover aspect-[2/3] rounded-lg"
        />
        <Image
          src={images[1]}
          alt="LyteMaster GMBH"
          className="w-full h-auto object-cover aspect-[2/3] rounded-lg"
        />
      </div>

      {/* Column with a single smaller image */}
      <div className="w-1/2 flex items-center">
        <Image
          src={images[2]}
          alt="LyteMaster GMBH"
          className="w-full h-auto object-cover aspect-[2/3] rounded-lg"
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
        src={placeholderImages.hero}
        alt="hero placeholder"
        className="w-full object-cover object-bottom brightness-75"
      />
      <div className="absolute inset-0 px-8 py-16 flex flex-col gap-6 items-start justify-center sm:px-16 sm:py-32 xl:py-72 xl:gap-10">
        <Title title={title} className="text-start text-nowrap" />
        <CtaButton
          name={cta.name}
          href={cta.href}
          className="border-white hover:bg-white hover:text-black"
        />
      </div>
    </section>
  );
};

// About section
const AboutSection = ({ title, description, cta, images }) => {
  return (
    <section
      id="about"
      className="h-max px-8 py-8 flex flex-col justify-between items-start gap-8 bg-white text-black sm:px-16 sm:py-16 sm:flex-row"
    >
      <div className="w-full h-full flex flex-col flex-shrink-0 gap-6 sm:w-2/3 sm:gap-8 xl:gap-12">
        <Title title={title} />
        <Description description={description} className="" />
        <CtaButton name={cta.text} href={cta.href} />
      </div>
      <AboutImages images={images} />
    </section>
  );
};

const HowWeWorkSection = ({ title, description, cta, highlights }) => {
  return (
    <section
      id="how-we-work"
      className="h-max px-8 py-8 flex flex-col justify-between items-start gap-24 bg-white text-black sm:flex-row sm:px-16 sm:py-16 lg:gap-32"
    >
      <div className="flex flex-col items-start gap-2 text-center">
        <h3 className="text-sm uppercase text-gray-500">{title}</h3>
        <h1 className="text-3xl text-black text-left">{description}</h1>
      </div>
      <div className="flex flex-col items-start gap-8">
        <ul className="flex flex-col justify-center items-center gap-2">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} index={index} highlight={highlight} />
          ))}
        </ul>
        <CtaButton name={cta.text} href={cta.href} />
      </div>
    </section>
  );
};

const RecentWorksSection = ({ title, projects }) => {
  return (
    <section
      id="industries"
      className="h-max px-8 py-8 flex flex-col justify-center items-start gap-6 bg-white text-black sm:px-16 sm:py-16"
    >
      <Title title={title} />
      <BentoGrid items={projects} />
    </section>
  );
};

const Newsletter = ({ title, cta }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send email to backend
    setEmail("");
  };

  return (
    <section className="h-max px-4 py-8 flex flex-col justify-center items-center gap-6 bg-white text-black sm:px-24 sm:py-16 lg:gap-12">
      <div className="w-full p-12 flex flex-col gap-12 bg-amber-300 rounded-2xl">
        <h1 className="w-full text-2xl font-bold text-black sm:text-3xl sm:w-2/3">
          {title}
        </h1>
        <div className="w-full flex flex-col justify-start gap-2 sm:items-end sm:gap-0 sm:flex-row sm:w-2/3">
          <input
            type="email"
            placeholder="example@example.com"
            className="flex-[2] px-4 py-2 border-b-2 border-black bg-transparent text-sm"
          />
          <button
            type="submit"
            className="flex-1 bg-black text-white px-6 py-3 font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center group"
          >
            {cta.text}
          </button>
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
        src={placeholderImages.commercial}
        alt="commercial lighting"
        className="w-full h-full object-cover object-center brightness-[35%]"
      />
      <div className="absolute inset-0 w-full h-full px-12 py-16 flex flex-col justify-center items-start gap-6 sm:px-24 sm:py-20">
        <div className="w-full flex flex-col justify-center items-start gap-2 sm:w-3/5 lg:w-2/3">
          <Title title={title} />
          <Description
            description={description}
            className="text-left text-gray-300"
          />
        </div>
        <Link
          href={cta.href}
          className="px-8 py-2 text-white border border-white rounded-full hover:bg-white hover:text-black xl:text-2xl xl:px-12 xl:py-3"
        >
          {cta.text}
        </Link>
      </div>
    </section>
  );
};

/* landing page */
export default function Landing() {
  return (
    <>
      <Hero {...landingData.heroSection} />
      <AboutSection {...landingData.aboutSection} />
      <ProductsSection {...landingData.productsSection} />
      <HowWeWorkSection {...landingData.howWeWorkSection} />
      <RecentWorksSection {...landingData.recentWorksSection} />
      <Newsletter {...landingData.newsletterSection} />
      <ContactSection {...landingData.contactSection} />
    </>
  );
}
