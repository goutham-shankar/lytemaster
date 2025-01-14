"use client";
import Link from "next/link";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  {
    name: "Products",
    href: "/products",
    dropdown: [
      { name: "Product 1", href: "/products/product-1" },
      { name: "Product 2", href: "/products/product-2" },
      { name: "Product 3", href: "/products/product-3" },
    ],
  },
  { name: "Projects", href: "/projects", dropdown: null },
  { name: "About us", href: "/about-us", dropdown: null },
  { name: "News", href: "/news", dropdown: null },
  { name: "Contact", href: "/contact", dropdown: false },
];

const variants = {
  navbar:
    "w-full h-20 pl-4 pr-8 flex justify-between items-center bg-white sm:px-12",
  navrail: "flex flex-col justify-center items-center gap-3 text-sm",
};

const Dropdown = ({ items, isOpen, setIsOpen }) => {
  return (
    <ul
      className={`z-10 absolute left-0 w-36 h-max px-3 py-2 flex flex-col justify-evenly items-start gap-2 bg-white/10 rounded-lg shadow-lg backdrop-blur-md transform transition-all duration-300 ease-in-out origin-top ${
        isOpen
          ? "opacity-100 translate-y-0 visible"
          : "opacity-0 -translate-y-2 invisible"
      }`}
      onMouseOver={() => setIsOpen(true)}
      onMouseOut={() => setIsOpen(false)}
    >
      {items.map((item, index) => (
        <li key={index} className="group/dropdown">
          <Link href={item.href}>{item.name}</Link>
          <span className="block max-w-0 group-hover/dropdown:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
        </li>
      ))}
    </ul>
  );
};

const NavItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      className="relative mx-2 group"
      onMouseOver={() => setIsOpen(true)}
      onMouseOut={() => setIsOpen(false)}
    >
      <Link href={item.href} className="flex items-center gap-2">
        {item.name}
        {item.dropdown &&
          (isOpen ? (
            <ChevronUp size={16} className="" />
          ) : (
            <ChevronDown size={16} className="" />
          ))}
      </Link>
      <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
      {item.dropdown && isOpen && (
        <Dropdown items={item.dropdown} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </li>
  );
};

const Navbar = () => {
  return (
    <ul className="flex justify-center items-center gap-3 text-sm">
      {navItems.map((item, index) => (
        <NavItem key={index} item={item} />
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
    <div
      className="z-10 absolute top-0 right-0 pl-4 pr-8 py-[1.37rem] w-screen h-screen flex flex-col justify-center items-center gap-5 text-sm bg-white/25 backdrop-blur-md no-doc-scroll sm:px-12"
      onClick={() => setNavrailOpen(!navrailOpen)}
    >
      <div className="w-full flex justify-between items-center gap-3 text-sm transition-all duration-300 ease-in-out">
        <h1 className="text-center text-3xl font-dmSerifDisplay">LyteMaster</h1>
        <MenuButton navrailOpen={navrailOpen} setNavrailOpen={setNavrailOpen} />
      </div>
      <ul className="w-full h-full flex flex-col justify-start items-start gap-2 text-sm">
        {navItems.map((item, index) => (
          <li key={index} className="group">
            <Link
              href={item.href}
              className="flex justify-center items-center gap-2 text-2xl "
            >
              {item.name}
            </Link>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
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
      setNavrailOpen(false);
    }
  }, [width]);
  return (
    <nav className={`${variants.navbar} z-50`}>
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
