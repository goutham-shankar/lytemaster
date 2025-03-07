import { Heading, Paragraph } from "@components/common/text";
import { placeholderImages } from "@assets/placeholders";
import Link from "next/link";
import Image from "next/image";
export default function ContactSection({ title, description, cta }) {
  return (
    <section
      id="contact"
      className="relative h-64 text-white lg:h-96 xl:h-[30rem] transition-transform duration-500"
    >
      <Image
        src={placeholderImages.commercial}
        alt="commercial lighting"
        width="auto"
        height="auto"
        className="w-full h-full object-cover object-center brightness-[35%]"
      />
      <div className="absolute inset-0 w-full h-full px-12 py-16 flex flex-col justify-center items-start gap-6 sm:px-24 sm:py-20">
        <div className="w-full flex flex-col justify-center items-start gap-2 sm:w-3/5 lg:w-2/3">
          <Heading title={title} variant="xl" />
          <Paragraph
            description={description}
            className="text-left text-gray-300"
          />
        </div>
        <Link
          href={cta.href}
          className="px-8 py-2 text-white border border-white rounded-full hover:bg-white hover:text-black xl:text-2xl xl:px-12 xl:py-3 duration-500 transition ease-in-out hover:scale-105"
        >
          {cta.text}
        </Link>
      </div>
    </section>
  );
}
