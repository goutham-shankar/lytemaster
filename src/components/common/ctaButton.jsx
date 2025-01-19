import Link from "next/link";

export default function CtaButton({
  name,
  href,
  className = "text-black border-black hover:bg-black hover:text-white",
}) {
  return (
    <Link
      href={href}
      className={`${className} px-8 py-2 text-xs border rounded-full transition-all duration-500 hover:scale-105 lg:text-lg xl:text-2xl`}
    >
      {name}
    </Link>
  );
}
