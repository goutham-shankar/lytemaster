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
      { name: "Commercial", link: "/products/commercial" },
      { name: "Industrial", link: "/products/industrial" },
      { name: "Landscape", link: "/products/landscape" },
    ],
  },
  {
    section: "About",
    links: [
      { name: "About us", link: "/about-us" },
      { name: "News", link: "/news" },
      { name: "Press", link: "/press" },
      { name: "Awards", link: "/awards" },
    ],
  },
  {
    section: "Contacts",
    links: [
      { name: "Legal Disclaimer", link: "/contacts/legal" },
      { name: "Privacy Policy", link: "/contacts/privacy" },
      { name: "Terms of Use", link: "/contacts/terms" },
      { name: "General", link: "/contact" },
    ],
  },
];

const FooterSection = ({ section, links, index }) => {
  return (
    <div key={index} className="w-max">
      <div className="relative inline-block">
        <h4 className="text-sm">{section}</h4>
        <span className="absolute bottom-0 left-0 w-2/3 h-1 border-b border-white"></span>
      </div>
      <ul className="py-2 flex flex-col gap-1">
        {links.map(({ name, link }, index) => (
          <li key={index} className="text-xs group">
            <Link href={link}>{name}</Link>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[0.05rem] bg-white"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Branding = () => {
  return (
    <div className="flex items-center gap-4">
      <Image src={logo} alt="LyteMaster Logo" width={50} />
      <h1 className="text-3xl font-dmSerifDisplay">LyteMaster</h1>
    </div>
  );
};

const Socials = () => {
  return (
    <div className="flex gap-2">
      {socials.map((social) => (
        <Link key={social.alt} href={social.link}>
          <social.icon size={16} />
        </Link>
      ))}
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="w-full h-96 px-8 flex flex-col-reverse justify-center items-center bg-black text-white sm:pl-16 sm:pr-24 sm:flex-row sm:gap-32 lg:gap-80">
      <div className="flex flex-col items-center justify-center gap-3">
        <Branding />
        <div className="flex flex-col gap-4">
          <p className="text-xs whitespace-pre-wrap">{address}</p>
          <Socials />
        </div>
      </div>
      <div className="flex gap-8 sm:gap-16">
        {footerLinks.map(({ section, links }, index) => (
          <FooterSection key={index} section={section} links={links} />
        ))}
      </div>
    </footer>
  );
}
