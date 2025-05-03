"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineArrowOutward } from "react-icons/md";

// Card styles for different layouts
export const bento = {
  featured: {
    item: "col-span-2 row-span-2",
    location: "text-xs sm:text-sm",
    name: "text-lg sm:text-xl lg:text-2xl font-medium",
  },
  wide: {
    item: "col-span-2 row-span-1",
    location: "text-xs sm:text-sm",
    name: "text-lg sm:text-xl lg:text-2xl font-medium",
  },
  small: {
    item: "col-span-1 row-span-1",
    location: "text-xs",
    name: "text-sm sm:text-base lg:text-lg font-medium",
  },
};

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export default function BentoGrid({ items, cta }) {
  const [width, setWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const loadMore = () => setShowAll(!showAll);

  const visibilityThreshold = isMobile ? 3 : 7;

  const showLoadMore = items.length > visibilityThreshold;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);

      let timeoutId;
      const debouncedResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 100);
      };

      window.addEventListener("resize", debouncedResize);
      return () => {
        window.removeEventListener("resize", debouncedResize);
        clearTimeout(timeoutId);
      };
    }
  }, []);

  useEffect(() => {
    setIsMobile(width <= breakpoints.sm);
  }, [width]);

  const displayedItems = showAll ? items : items.slice(0, visibilityThreshold);

  return (
    <div className="w-full">
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[240px] sm:auto-rows-[280px] lg:auto-rows-[300px]">

      {displayedItems.map((item, index) => {
  let gridClass = "col-span-1";

  if (items.length === 2) {
    gridClass = "col-span-2 sm:col-span-2"; // Equal size for both images when only 2
  } else if (index === 0) {
    gridClass = "col-span-1 sm:col-span-2 sm:row-span-2";
  } else if (index === 5) {
    gridClass = "col-span-1 sm:col-span-2";
  } else if ((index > 6 && index % 3 === 0) || index === 6) {
    gridClass = "col-span-1 sm:col-span-2";
  } else {
    gridClass = "col-span-1"; // default fallback
  }

  return (
    <div key={index} className={`${gridClass} rounded-xl overflow-hidden relative h-full`}>

      <Image
        src={item.image.src}
        alt={item.image.alt || "Project"}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        quality={85}
        priority={index === 0}
      />
      <Link
        href={item.href || "#"}
        className="group absolute inset-0 flex flex-col justify-end p-4 sm:p-5"
      >
        <div className="z-10">
          <p className="text-xs text-white/80">{item.location}</p>
          <h3
            className={`${
              items.length === 2
                ? "text-sm sm:text-base lg:text-lg"
                : index === 0 || index === 5 || index === 6 || index % 3 === 0
                ? "text-sm sm:text-xl lg:text-2xl"
                : "text-sm sm:text-base lg:text-lg"
            } font-medium text-white mt-1`}
          >
            {item.name}
            {item.external && (
              <span className="inline-block ml-1 transform translate-y-[1px]">
                <MdOutlineArrowOutward size={16} />
              </span>
            )}
          </h3>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5 group-hover:via-black/40 transition-all duration-300" />
      </Link>
    </div>
  );
})}

      </div>

      {showLoadMore && (
        <div className="mt-8 flex justify-center">
          <button
            className={`flex items-center gap-3 px-6 py-2 bg-black text-white rounded-full hover:scale-105 active:scale-95 transition-transform duration-300 ${cta?.className || ""}`}
            onClick={loadMore}
            aria-label={!showAll ? cta?.name || "Load More" : "Show Less"}
          >
            <span className="text-sm sm:text-base lg:text-lg">
              {!showAll ? cta?.name || "Load More" : "Show Less"}
            </span>
            <div
              className={`flex items-center justify-center w-8 h-8 bg-white text-black rounded-full transition-transform duration-300 ${
                showAll ? "rotate-180" : ""
              }`}
            >
              <MdOutlineArrowOutward />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
