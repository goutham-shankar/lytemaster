const variants = {
  md: "text-lg sm:text-2xl lg:text-4xl xl:text-5xl",
  lg: "text-xl sm:text-3xl lg:text-5xl xl:text-6xl",
  xl: "text-2xl sm:text-3xl lg:text-5xl xl:text-7xl",
  "2xl": "text-3xl sm:text-3xl lg:text-5xl xl:text-7xl",
};

export default function Heading({ title, className = "", variant = "lg" }) {
  return <h1 className={`${className} ${variants[variant]}`}>{title}</h1>;
}
