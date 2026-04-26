import Image from "next/image";
import Link from "next/link";
import blackLogo from "../../public/logo/jobFlowBlack.svg";
import whiteLogo from "../../public/logo/jobFlowWhite.svg";

const Logo = ({ color = "white" }: { color?: "white" | "black" }) => {
  const logo = color === "black" ? blackLogo : whiteLogo;

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Image src={logo} alt="Job Flow Logo" className="w-[140px] h-auto" />
    </Link>
  );
};

export default Logo;
