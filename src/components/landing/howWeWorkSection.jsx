import CtaButton from "@components/common/ctaButton";

const HighlightCard = ({ index, highlight }) => {
  return (
    <li className="w-full flex justify-start items-start gap-4 sm:justify-end lg:text-xl xl:text-2xl">
      <span className="text-sm text-gray-400 lg:text-base xl:text-lg">
        0{index + 1}{" "}
      </span>
      <p>{highlight.text}</p>
    </li>
  );
};

export default function HowWeWorkSection({
  title,
  description,
  cta,
  highlights,
}) {
  return (
    <section
      id="how-we-work"
      className="h-max mt-10 p-8 flex flex-col justify-between items-start gap-8 text-black sm:flex-row sm:mt-10 sm:pl-20 sm:pr-24 sm:py-16 sm:gap-24 lg:pl-24 lg:pr-28 lg:gap-32 xl:mt-28 xl:pl-32 xl:pr-44"
    >
      <div className="flex flex-col items-start gap-2 text-center">
        <h3 className="text-sm uppercase text-gray-500">{title}</h3>
        <h1 className="text-3xl text-black text-left sm:text-2xl lg:text-3xl xl:text-4xl">
          {description}
        </h1>
      </div>
      <div className="flex flex-col items-start gap-8 w-full sm:py-8 sm:w-[52rem] md:gap-14">
        <ul className="w-full flex flex-col justify-center items-center gap-8">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} index={index} highlight={highlight} />
          ))}
        </ul>
        <CtaButton name={cta.text} href={cta.href} />
      </div>
    </section>
  );
}
