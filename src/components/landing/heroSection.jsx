import Image from "next/image";
import { placeholderImages } from "@/assets/placeholders";
import { Heading } from "@components/common/text";
import CtaButton from "@components/common/ctaButton";

// TODO: Update hero placeholder image with a background video
// Hero section

export default function Hero({ title, cta }) {
  return (
    <section className="relative text-white text-center">
      <Image
        src={placeholderImages.hero}
        alt="hero placeholder"
        className="w-full object-cover object-bottom brightness-75"
      />
      <div className="absolute inset-0 px-8 py-16 flex flex-col gap-6 items-start justify-center sm:px-16 sm:py-32 xl:py-72 xl:gap-10">
        <Heading title={title} className="text-start text-nowrap" />
        <CtaButton
          name={cta.name}
          href={cta.href}
          className="border-white hover:bg-white hover:text-black"
        />
      </div>
    </section>
  );
}
