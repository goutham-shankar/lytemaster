import { Heading } from "@components/common/text";

export default function CatalogueSection() {
  return (
    <section
      id="catalogue"
      className="h-max p-8 flex flex-col justify-center items-start gap-6 text-black sm:px-16 sm:py-16 lg:px-20"
    >
      <Heading title="Catalogue" variant="2xl" />
      <div className="w-full flex flex-col justify-between items-center gap-5 sm:flex-row">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-56 h-64 xl:w-64 xl:h-80 bg-black/80 rounded-lg"
            ></div>
          ))}
      </div>
    </section>
  );
}
