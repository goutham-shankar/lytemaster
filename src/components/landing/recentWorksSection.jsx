import { Heading } from "@components/common/text";
import BentoGrid from "@components/projects/bentoGrid";
export default function RecentWorksSection({ title, projects }) {
  return (
    <section
      id="industries"
      className="h-max px-8 py-8 flex flex-col justify-center items-start gap-6 bg-white text-black sm:px-16 sm:py-16"
    >
      <Heading title={title} variant="2xl" />
      <BentoGrid items={projects} />
    </section>
  );
}
