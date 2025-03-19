"use client";

import Link from "next/link";
import Logo from "@/components/common/logo";
import { usePathname } from "next/navigation";

export default function Branding() {
  const pathname = usePathname();

  return (
    <Link href="/" className="w-36 sm:w-48 xl:w-56 2xl:w-72 --bg-[red] items-center justify-center">
      {pathname === "/" ? (
        <img src="/logo2.png" alt="" className="w-[85%]" />
      ) : (
        <Logo />
      )}
    </Link>
  );
}
