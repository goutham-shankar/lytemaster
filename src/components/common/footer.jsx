import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import logo from "@public/logo.png";

const address = `Lyte Master GmbH
Auf dem SchurweBel 5 53347
Alfter -Witterschlick - Germany

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

const FooterSection = ({ section, links, index }) => {
  return (
    <div key={index} className="w-max">
      <div className="relative inline-block">
        <h4 className="text-sm lg:text-base xl:text-xl">{section}</h4>
        <span className="absolute bottom-0 left-0 w-2/3 h-1 border-b border-white"></span>
      </div>
      <ul className="py-2 flex flex-col gap-1 text-gray-300">
        {links.map(({ name, link }, index) => (
          <li
            key={index}
            className="w-min text-xs group lg:text-sm xl:text-base"
          >
            <Link href={link} className="text-nowrap">
              {name}
            </Link>
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
      {/* <Image
        src={logo}
        alt="LyteMaster Logo"
        width={50}
        className="w-12 lg:w-16"
      /> */}
      {/* <h1 className="text-3xl font-dmSerifDisplay lg:text-4xl">LyteMaster</h1> */}
      <h1 className="text-3xl font-dmSerifDisplay lg:text-4xl">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>

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
    // <footer style = {{backgroundColor : "#707070 "}} className="w-full h-96 px-8 flex flex-col-reverse justify-center items-center bg-black text-white sm:pl-16 sm:pr-24 sm:py-24 sm:flex-row sm:justify-between sm:items-start sm:gap-32 lg:gap-80 xl:gap-[36rem]">
       <footer style={{ backgroundColor: "#707070" }} 
   className="w-full h-[40vh] sm:h-[30vh] lg:h-[25vh] xl:h-[20vh] px-8 flex flex-col-reverse justify-center items-center bg-black text-white sm:pl-16 sm:pr-24 sm:py-24 sm:flex-row sm:justify-between sm:items-start sm:gap-32 lg:gap-80 xl:gap-[36rem]">

      <div className="flex flex-col items-center justify-center gap-3">
        <Branding />
        <div className="flex flex-col gap-4 text-gray-300">
          <p className="text-xs whitespace-pre-wrap lg:text-sm xl:text-base">
            {address}
          </p>
          <Socials />
        </div>
      </div>
      <div className="py-8 flex gap-8 sm:gap-16">
        {footerLinks.map(({ section, links }, index) => (
          <FooterSection key={index} section={section} links={links} />
        ))}
      </div>
    </footer>
  );
}
