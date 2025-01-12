import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import logo from "@public/logo.png";

const address = `Apricot Towers
Dubai Silicon Oasis, Dubai
United Arab Emirates
`;
const socials = [
  {
    alt: "Instagram",
    icon: Instagram,
    link: "#",
  },
  {
    alt: "Facebook",
    icon: Facebook,
    link: "#",
  },
  {
    alt: "Linkedin",
    icon: Linkedin,
    link: "#",
  },
  { alt: "Twitter", icon: Twitter, link: "#" },
];

const footerLinks = [
  {
    section: "Products",
    links: [
      { name: "Commercial", link: "#" },
      { name: "Industrial", link: "#" },
      { name: "Landscape", link: "#" },
    ],
  },
  {
    section: "About",
    links: [
      { name: "About us", link: "#" },
      { name: "News", link: "#" },
      { name: "Press", link: "#" },
      { name: "Awards", link: "#" },
    ],
  },
  {
    section: "Contacts",
    links: [
      { name: "Legal Disclaimer", link: "#" },
      { name: "Privacy Policy", link: "#" },
      { name: "Terms of Use", link: "#" },
      { name: "General", link: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full h-80 pl-16 pr-24 flex justify-between items-center bg-black text-white">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-4">
          <Image src={logo} alt="LyteMaster Logo" width={50} />
          <h1 className="text-3xl font-dmSerifDisplay">LyteMaster</h1>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs whitespace-pre-wrap">{address}</p>

          <div className="flex gap-2">
            {socials.map((social) => (
              <Link key={social.alt} href={social.link}>
                <social.icon size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-16">
        {footerLinks.map(({ section, links }, index) => (
          <div key={index}>
            <div className="relative inline-block">
              <h4 className="text-sm">{section}</h4>
              <span className="absolute bottom-0 left-0 w-2/3 h-1 border-b border-white"></span>
            </div>
            <ul className="py-2 flex flex-col gap-1">
              {links.map(({ name, link }, index) => (
                <li key={index} className="text-xs">
                  <Link href={link}>{name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
