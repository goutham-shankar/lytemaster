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
        width={1920}
        height={1080}
        className="w-full h-[50vh] object-cover object-bottom brightness-75 sm:h-max lg:hidden"
      />
{/* width="320" height="240" */}
      <video autoPlay  loop muted className="w-full h-[50vh] object-cover object-bottom brightness-75 sm:h-max  hidden lg:block"  >
        <source src={"/video.mp4" } type="video/mp4" />
        {/* <source src="movie.ogg" type="video/ogg"/> */}
        {/* Your browser does not support the video tag. */}
      </video>



      <div className="absolute inset-0 px-8 py-32 flex flex-col gap-6 items-start justify-start sm:px-16 sm:py-32 xl:py-72 xl:gap-10">
        <Heading
          title={title}
          className="text-start text-nowrap lg:hidden"
          variant="2xl"
        />
        <CtaButton
          name={cta.name}
          href={cta.href}
          className="border-white hover:bg-white hover:text-black lg:hidden"
        />
      </div>
    </section>
  );
}
