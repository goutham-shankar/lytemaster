import Image from "next/image";
import aboutImage from "@assets/about.png";

const aboutText = `Lyte Master is all about manufacturing Industrial and Commercial LED Lights and its components by following all aspects of the environment Our company is dedicated to the development of sustainable semiconductor lighting products and solutions, we provide the next generation LED lighting solutions that are Energy- Efficient- Eco-friendly-Economical and at the same time; Stylish. Lyte Master is ISO certified manufacturer along with CE and Rohs and TUV Compliance, and targeting to be UL, and PSE Cerified. We stand way ahead in delivering quality products and solutions for different applications that meet and exceed our customers expectation, Having total commitment to quality and services, we are dedicated to build and maintain a long -term partnership with our valuable customers, and thereby make contribution to the environment by lighting up a new world`;
const WhatWeDoText = `We are your one-stop Solutions for lighting for homes, hallways, classrooms, living area, gymnasiums, theatres, and more. We always deliver standard products that are sure to meet the expectations of the customers both in terms of performance and in terms of the design. Quality and innovation are those two things that we never compromise on and will never compromise on. We are the leading service provides for Interior and exterior lighting for warehouses, offices, godowns, storefronts, restaurants, and warehouses. Lyte Master means Quality and Innovation`;
const Breadcrumbs = () => {
  return (
    <div className="flex items-center text-black xl:text-xl 2xl:text-2xl">
      <a href="/" className="hover:text-gray-500 mr-2">
        Home
      </a>
      <span className="font-bold">/</span>
      <span className="whitespace-pre"> About</span>
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="h-max my-16 p-8 flex flex-col justify-center items-start gap-5 sm:my-20 sm:px-16 2xl:px-36 2xl:my-44 2xl:gap-12">
      <Breadcrumbs />
      <h1 className="text-5xl font-bold 2xl:text-6xl">About Us</h1>
      <div className="flex flex-col justify-between items-start gap-12 sm:gap-16 lg:flex-row 2xl:gap-24">
        <p className="whitespace-pre-wrap shrink-0 w-full text-sm lg:text-xs xl:text-sm 2xl:text-lg lg:w-3/5 2xl:w-[60%]">
          {aboutText}
        </p>
        <Image
          src={aboutImage}
          alt="About Us"
          width={1000}
          height={500}
          className="rounded-xl"
        />
      </div>

      <h1 className="text-5xl font-bold 2xl:text-6xl">What We Do</h1>
      <div className="flex flex-col justify-between items-start gap-12 sm:gap-16 lg:flex-row 2xl:gap-24">
        <p className="whitespace-pre-wrap shrink-0 w-full text-sm lg:text-xs xl:text-sm 2xl:text-lg lg:w-3/5 2xl:w-[60%]">
          {WhatWeDoText}
        </p>
      </div>
    </div>
  );
}
