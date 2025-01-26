export default function Heading({ title, className = "" }) {
  return (
    <h1 className={`${className} text-xl sm:text-3xl lg:text-5xl xl:text-7xl`}>
      {title}
    </h1>
  );
}
