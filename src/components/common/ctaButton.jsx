import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";
export default function CtaButton({ name, href, className = "" }) {
  return (
    <Link
      href={href}
      className={`${className} w-max pl-5 flex justify-between items-center gap-4 text-xs text-nowrap rounded-full bg-black text-white transition-all duration-500 hover:scale-105 lg:text-base xl:text-xl`}
    >
      {name}
      <MdOutlineArrowOutward className="w-8 h-8 m-[0.1rem] p-1 bg-white text-black rounded-full sm:w-10 sm:h-10 sm:p-2 xl:w-12 xl:h-12" />
    </Link>
  );
}
