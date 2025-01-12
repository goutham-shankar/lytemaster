import Image from "next/image";
import Link from "next/link";
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
const Hero = () => {
  return (
    <section className="flex-1 flex flex-col justify-center items-center gap-4 bg-[url('../assets/landing/hero-placeholder.jpeg')] bg-cover bg-center text-white">
      <h1 className="w-2/3 text-5xl font-bebasNeue uppercase text-center">
        World class range of lighting solutions
      </h1>
      <CtaButton name="View More" href="#" />
    </section>
  );
};

export default function Landing() {
  return (
    <>
      <Hero />
    </>
  );
}
