import Link from "next/link";
import { ChevronDown } from "lucide-react";

const navItems = [
  { name: "Products", href: "#", dropdown: true },
  { name: "Projects", href: "/projects", dropdown: false },
  { name: "About us", href: "/about-us", dropdown: false },
  { name: "News", href: "/news", dropdown: false },
  { name: "Contact", href: "/contact", dropdown: false },
];

// TODO: Add dropdown functionality
// TODO: Add global search functionality
export default function Nav() {
  return (
    <nav className="w-full h-20 flex justify-evenly items-center bg-white">
      <h1 className="text-center text-3xl font-dmSerifDisplay">LyteMaster</h1>
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
    </nav>
  );
}
