import Image from "next/image";
import { placeholderImages } from "@/assets/placeholders";
import { Heading } from "@components/common/text";
import CtaButton from "@components/common/ctaButton";
import VideoCarousel from "./videoCarousel";

// TODO: Update hero placeholder image with a background video
// Hero section

export default function Hero({ title, cta, videos }) {
    return (
        <section className="relative text-white text-center">
            {/* <Image
                src={placeholderImages.hero}
                alt="hero placeholder"
                width={1920}
                height={1080}
                className="w-full h-screen object-cover object-bottom brightness-75 sm:h-max lg:hidden"
            /> */}

            <VideoCarousel videos={videos} />

            {/* <div className="absolute inset-0 px-8 py-32 flex flex-col gap-6 items-start justify-start sm:px-16 sm:py-32 xl:py-72 xl:gap-10">
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
            </div> */}
        </section>
    );
}
