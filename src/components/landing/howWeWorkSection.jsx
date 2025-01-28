import CtaButton from "@components/common/ctaButton";

const HighlightCard = ({ index, highlight }) => {
  return (
    <li className="flex justify-between items-start gap-4 lg:text-xl xl:text-2xl">
      <span className="text-gray-400">0{index + 1} </span>
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
      className="h-max p-8 flex flex-col justify-between items-start gap-8 text-black sm:flex-row sm:px-20 sm:py-16 sm:gap-24 lg:px-24 lg:gap-32"
    >
      <div className="flex flex-col items-start gap-2 text-center">
        <h3 className="text-sm uppercase text-gray-500">{title}</h3>
        <h1 className="text-3xl text-black text-left">{description}</h1>
      </div>
      <div className="flex flex-col items-start gap-8">
        <ul className="flex flex-col justify-center items-center gap-2">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} index={index} highlight={highlight} />
          ))}
        </ul>
        <CtaButton name={cta.text} href={cta.href} />
      </div>
    </section>
  );
}
