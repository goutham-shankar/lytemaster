"use client";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Products", href: "/products", dropdown: true },
  { name: "Projects", href: "/projects", dropdown: false },
  { name: "About us", href: "/about-us", dropdown: false },
  { name: "News", href: "/news", dropdown: false },
  { name: "Contact", href: "/contact", dropdown: false },
];

const variants = {
  navbar:
    "w-full h-20 pl-4 pr-8 flex justify-between items-center bg-white sm:px-12",
  navrail: "flex flex-col justify-center items-center gap-3 text-sm",
};

const Navbar = () => {
  return (
    <ul className="flex justify-center items-center gap-3 text-sm">
      {navItems.map((item, index) => (
        <li key={index} className="mx-2">
          <Link href={item.href} className="flex items-center gap-2">
            {item.name}
            {item.dropdown && <ChevronDown size={16} />}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const MenuButton = ({ navrailOpen, setNavrailOpen, className = "" }) => {
  return (
    <button
      className={`${className} flex items-center gap-2 text-sm`}
      onClick={() => setNavrailOpen(!navrailOpen)}
    >
      {navrailOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
};

const Navrail = ({ navrailOpen, setNavrailOpen }) => {
  return (
    <div className="z-10 absolute top-0 right-0 pl-4 pr-8 py-[1.37rem] w-screen h-screen flex flex-col justify-center items-center gap-2 text-sm bg-white/25 backdrop-blur-md no-doc-scroll sm:px-12">
      <div className="w-full flex justify-between items-center gap-3 text-sm transition-all duration-300 ease-in-out">
        <h1 className="text-center text-3xl font-dmSerifDisplay">LyteMaster</h1>
        <MenuButton navrailOpen={navrailOpen} setNavrailOpen={setNavrailOpen} />
      </div>
      <ul className="w-full h-full flex flex-col justify-start items-start gap-5 text-sm">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="flex justify-center items-center gap-2 text-2xl"
            >
              {item.name}
              {item.dropdown && <ChevronDown size={16} />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": "1536",
};

// TODO: Add dropdown functionality
// TODO: Add global search functionality
export default function Nav() {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [navrailOpen, setNavrailOpen] = useState(false);

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
    if (width <= breakpoints.md) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);
  useEffect(() => {
    console.log(navrailOpen);
  }, [navrailOpen]);
  return (
    <nav className={`${variants.navbar}`}>
      <h1 className="text-center text-3xl font-dmSerifDisplay">LyteMaster</h1>
      {isMobile && !navrailOpen && (
        <MenuButton navrailOpen={navrailOpen} setNavrailOpen={setNavrailOpen} />
      )}
      {isMobile && navrailOpen && (
        <Navrail navrailOpen={navrailOpen} setNavrailOpen={setNavrailOpen} />
      )}
      {!isMobile && <Navbar />}
    </nav>
  );
}
