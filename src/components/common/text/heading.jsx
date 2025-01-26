const variants = {
  lg: "text-xl sm:text-3xl lg:text-5xl xl:text-7xl",
  xl: "text-2xl sm:text-3xl lg:text-5xl xl:text-7xl",
  "2xl": "text-3xl sm:text-3xl lg:text-5xl xl:text-7xl",
};

export default function Heading({ title, className = "", variant = "lg" }) {
  return <h1 className={`${className} ${variants[variant]}`}>{title}</h1>;
}
