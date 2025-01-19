import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export const bento = {
  lg: {
    item: "sm:col-span-2 sm:row-span-2",
    location: "text-sm lg:text-md",
    name: "text-md sm:text-xl lg:text-2xl",
  },
  md: {
    item: "sm:col-span-2 sm:row-span-1",
    location: "text-sm lg:text-md",
    name: "text-md sm:text-lg lg:text-xl",
  },
  sm: {
    item: "col-span-1 row-span-1",
    location: "text-sm sm:text-[0.65rem] lg:text-[.9rem]",
    name: "text-md sm:text-sm lg:text-lg",
  },
};

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default function BentoGrid({ items }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width <= breakpoints.sm) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <div className="w-full h-[32rem] grid grid-cols-1 grid-rows-3 gap-3 text-white sm:grid-cols-4 sm:grid-rows-3">
      {(isMobile ? items.slice(0, 3) : items).map((item, index) => (
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
