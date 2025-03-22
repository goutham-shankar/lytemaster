import { Heading } from "@components/common/text";
import Carousel from "@components/common/carousel";

export default function RecentWorksSection({ title, projects }) {
  return (
    <section
      id="industries"
      className="h-max py-8 flex flex-col justify-center items-start gap-6 text-black sm:px-16 sm:py-16 lg:px-20"
    >
      <div className="px-8">
        <Heading title={title} variant="2xl" />
      </div>
      <Carousel items={projects} />
    </section>
  );
}
