import { useState, useEffect } from "react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

export default function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth < 640 ? 1 : 3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div className="w-full pb-4 flex justify-end items-center gap-8">
        <button
          className="z-10 p-2 rounded-full bg-white/10 text-black hover:bg-black hover:text-white transition"
          onClick={prevSlide}
        >
          <HiOutlineArrowLeft size={32} />
        </button>
        <button
          className="z-10 p-2 rounded-full bg-white/10 text-black hover:bg-black hover:text-white transition"
          onClick={nextSlide}
        >
          <HiOutlineArrowRight size={32} />
        </button>
      </div>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
        }}
      >
        {items.concat(items.slice(0, visibleCards)).map((item, index) => (
          <div
            key={index}
            className="w-full px-4 sm:w-1/3 flex-shrink-0 h-80 lg:h-96 rounded-xl relative flex flex-col justify-end items-start overflow-hidden group"
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={800}
              height={1000}
              className="grayscale rounded-xl absolute object-cover w-full h-full brightness-75 object-top transition duration-300 group-hover:brightness-50 group-hover:grayscale-0"
            />
            <Link
              href={item.href}
              className="relative w-min px-4 py-6 flex flex-col justify-end text-white"
            >
              <div className="flex flex-col justify-end">
                <p className={`${item.className.location} text-nowrap`}>
                  {item.location}
                </p>
                <p className={`text-lg text-nowrap lg:text-2xl xl:text-3xl`}>
                  {item.name}
                </p>
              </div>
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[0.05rem] bg-white"></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
