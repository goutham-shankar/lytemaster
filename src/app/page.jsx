import Image from "next/image";
import Link from "next/link";
import gmbhPlaceholder from "@assets/landing/gmbh-placeholder.jpeg";
const CtaButton = ({ name, href }) => {
  return (
    <button>
      <Link href={href} className="px-8 py-2 border rounded-full">
        {name}
      </Link>
    </button>
  );
};

// TODO: Update hero placeholder image with a background video
// Hero section
const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center gap-4 bg-[url('../assets/landing/hero-placeholder.jpeg')] bg-cover bg-center text-white">
      <h1 className="w-2/3 text-5xl font-bebasNeue uppercase text-center">
        World class range of lighting solutions
      </h1>
      <CtaButton name="View More" href="#" />
    </section>
  );
};

// LyteMaster GMBH section
// TODO: Update LyteMaster GMBH placeholder image with a video
const LyteMasterGmbh = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center gap-6 bg-white text-black">
      <div className="w-2/3 flex flex-col items-center gap-2">
        <h2 className="text-center text-2xl ">Welcome to</h2>
        <h1 className="text-5xl font-bebasNeue uppercase text-center">
          LyteMaster GMBH
        </h1>
        <p className="text-xs text-center">
          Driven by the increasing demand for energy efficient lighting, Lyte
          Master GmbH has, Since the late 2000s been in the LED lighting market
          and more recently taking advantage of the rapid developments in LED
          technology to bring you a world class range of LED Lighting Solutions.
        </p>
      </div>
      <CtaButton name="About us" href="#" />
      <Image
        src={gmbhPlaceholder}
        alt="LyteMaster GMBH"
        className="w-4/5 h-96 rounded-lg object-cover"
      />
    </section>
  );
};

export default function Landing() {
  return (
    <>
      <Hero />
      <LyteMasterGmbh />
    </>
  );
}
