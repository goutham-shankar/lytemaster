import CtaButton from "@components/common/ctaButton";
import Image from "next/image";
import { Heading, Paragraph } from "@components/common/text";
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

// About section
export default function AboutSection({ title, description, cta, images }) {
  return (
    <section
      id="about"
      className="h-max px-8 py-8 flex flex-col justify-between items-start gap-8 bg-white text-black sm:px-16 sm:py-16 sm:flex-row"
    >
      <div className="w-full h-full flex flex-col flex-shrink-0 gap-6 sm:w-2/3 sm:gap-8 xl:gap-12">
        <Heading title={title} />
        <Paragraph description={description} className="" />
        <CtaButton name={cta.text} href={cta.href} />
      </div>
      <AboutImages images={images} />
    </section>
  );
}
