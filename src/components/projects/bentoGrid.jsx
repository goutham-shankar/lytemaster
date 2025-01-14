import Link from "next/link";
import Image from "next/image";

export const bento = {
  lg: { item: "col-span-2 row-span-2", location: "text-sm", name: "text-xl" },
  md: {
    item: "col-span-2 ",
    location: "text-sm",
    name: "text-xl",
  },
  sm: {
    item: "col-span-1 row-span-1",
    location: "text-[0.65rem]",
    name: "text-xs",
  },
};

export default function BentoGrid({ items }) {
  return (
    <div className="w-full h-[32rem] grid grid-cols-4 grid-rows-3 gap-3 text-white">
      {items.map((item, index) => (
        <div
          key={index}
          className={`w-full h-full relative flex flex-col justify-end items-start overflow-hidden rounded-xl group ${item.className.item}`}
        >
          <img
            src={item.image.src}
            alt={item.image.alt}
            className="absolute object-cover w-full h-full brightness-75 transition duration-300 group-hover:scale-105 group-hover:brightness-50"
          />
          <Link
            href={item.href}
            className="relative w-min px-4 py-6 flex flex-col justify-end text-white"
          >
            <div className="flex flex-col justify-end">
              <p className={`${item.className.location} text-nowrap`}>
                {item.location}
              </p>
              <p className={`${item.className.name} text-nowrap`}>
                {item.name}
              </p>
            </div>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[0.05rem] bg-white"></span>
          </Link>
        </div>
      ))}
    </div>
  );
}
