import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";

const Logo = ({ color = "white" }: { color?: string }) => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
        <BriefcaseIcon className="w-4 h-4 text-white" />
      </div>
      <span
        className={`text-${color} font-bold text-xl tracking-tight font-serif`}
      >
        Job<span className="text-primary">.</span>Flow
      </span>
    </Link>
  );
};

export default Logo;
