"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
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
      ${scrolled ? "bg-black" : "bg-transparent"}`}
    >
      <nav className="container relative z-10 flex items-center justify-between px-8 lg:px-16 py-6">
        <Logo />

        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          {["Jobs", "Companies", "Salary", "Blog"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors font-medium"
          >
            Login
          </Link>

          <Link
            href="#"
            className="px-5 py-2 text-sm font-semibold text-white rounded-xl 
            bg-primary-gradient hover:scale-[1.03] transition-all"
          >
            Post a Job
          </Link>
        </div>
      </nav>
    </section>
  );
}
