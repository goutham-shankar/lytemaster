const variants = {
  base: "text-xs lg:text-lg xl:text-2xl",
  lg: "text-base lg:text-lg xl:text-xl",
};

export default function Paragraph({
  description,
  className = "text-center",
  variant = "base",
}) {
  return <p className={`${className} ${variants[variant]}`}>{description}</p>;
}
