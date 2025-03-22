import { Heading } from "@components/common/text";

export default function CatalogueSection() {
  return (
    <section
      id="catalogue"
      className="h-max p-8 flex flex-col justify-center items-start gap-6 text-black sm:px-16 sm:py-16 lg:px-20"
    >
      <Heading title="Catalogs" variant="2xl" />
      <div className="w-full flex flex-row  justify-center items-center gap-[15px]  --bg-[red] items-center flex-wrap">
        {Array(5)
          .fill(0)  
          .map((_, i) => (
            <div
              key={i}
              className="w-[100px] h-[150px] xl:w-64 xl:h-80 bg-black/80 rounded-lg"
            ></div>
          ))}
      </div>
    </section>
  );  
}
