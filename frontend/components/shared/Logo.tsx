import { BriefcaseIcon } from "lucide-react";
import Link from "next/link";

const Logo = ({ color = "white" }: { color?: string }) => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center "
        style={{
          background: color,
          color: color === "white" ? "black" : "white",
        }}
      >
        <BriefcaseIcon className={`w-4 h-4 `} />
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
