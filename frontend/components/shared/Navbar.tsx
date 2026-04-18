"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function NavbarLight() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300
      ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm " : "bg-transparent"
      }`}
    >
      <nav className="container relative z-10 flex items-center justify-between px-8 lg:px-16 py-6">
        <Logo color="black" />

        <div className="flex gap-6 items-center">
          <Link
            href="/jobs"
            className="text-black/70 hover:text-black transition-colors"
          >
            Jobs
          </Link>
          <Link
            href="/login"
            className="text-black/70 hover:text-black transition-colors"
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
