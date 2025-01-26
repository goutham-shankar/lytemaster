import CtaButton from "@components/common/ctaButton";
import Image from "next/image";
import { Heading, Paragraph } from "@components/common/text";
import LightBulb from "@components/common/svgs/lightbulb";
const AboutImages = ({ images }) => {
  return (
    <div className="w-full py-4 flex flex-row gap-6">
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
      className="h-max px-8 py-8 flex flex-col justify-between items-start gap-8 text-black sm:px-16 sm:py-16 sm:flex-row lg:px-20"
    >
      <div className="w-full h-full flex flex-col flex-shrink-0 gap-6 sm:w-2/3 sm:gap-8 xl:gap-12">
        <div>
          <div className="flex items-center gap-2 sm:gap-4">
            <LightBulb className="flex-shrink-0 inline-block w-7 h-7 text-yellow-500 lg:w-10 lg:h-10 xl:w-14 xl:h-14" />
            <Heading title={title[0]} className="text-nowrap" />
          </div>
          <Heading title={title[1]} />
        </div>
        <Paragraph description={description} className="" />
        <CtaButton name={cta.text} href={cta.href} />
      </div>
      <AboutImages images={images} />
    </section>
  );
}
