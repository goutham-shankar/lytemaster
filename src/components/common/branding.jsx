import Link from "next/link";
import Logo from "@/components/common/logo";

export default function Branding() {
  return (
    <Link href={"/"} className="w-36 sm:w-48 xl:w-56 2xl:w-72">
      <Logo />
    </Link>
  );
}
