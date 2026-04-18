"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <section
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300
      ${
        isHome
          ? scrolled
            ? "bg-light-background backdrop-blur-md shadow-sm"
            : "bg-transparent"
          : "bg-light-background backdrop-blur-md shadow "
      }`}
    >
      <nav className="container relative z-10 flex items-center justify-between px-8 lg:px-16 py-4">
        <Logo color="black" />

        <div className="flex gap-6 items-center">
          <Link
            href="/jobs"
            className={`text-sm font-medium transition-colors relative
              ${
                isActive("/jobs")
                  ? "text-black after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:rounded-full after:bg-primary"
                  : "text-black/60 hover:text-black"
              }`}
          >
            Jobs
          </Link>

          <Link
            href="/login"
            className={`text-sm font-medium transition-colors relative
              ${
                isActive("/login")
                  ? "text-black after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:rounded-full after:bg-primary"
                  : "text-black/60 hover:text-black"
              }`}
          >
            Login
          </Link>

          <Link
            href="#"
            className="px-5 py-2 text-sm font-medium text-white rounded-lg
            hover:scale-[1.03] hover:opacity-90 transition-all"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
              boxShadow: "0 2px 12px rgba(91,79,207,0.25)",
            }}
          >
            Post a Job
          </Link>
        </div>
      </nav>
    </section>
  );
}
