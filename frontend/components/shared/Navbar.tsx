"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import UserDropdown from "./UserDropdown";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const isHome = pathname === "/";
  const isActive = (href: string) => pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isHome
          ? scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-black/5"
            : "bg-transparent"
          : "bg-white/80 backdrop-blur-md border-b border-black/5"
      }`}
    >
      <nav className="container flex items-center justify-between px-8 lg:px-16 h-14">
        <Logo color="black" />

        <div className="flex items-center gap-2">
          <Link
            href="/jobs"
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              isActive("/jobs")
                ? "bg-black/5 text-black font-medium"
                : "text-black hover:text-black hover:bg-black/5"
            }`}
          >
            Jobs
          </Link>

          <div className="w-px h-4 bg-black/10 mx-1" />

          {!user && (
            <>
              <Link
                href="/login"
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  isActive("/login")
                    ? "bg-black/5 text-black font-medium"
                    : "text-black hover:text-black hover:bg-black/5"
                }`}
              >
                Login
              </Link>
              <Link href="/register">
                <Button className="rounded-full h-9 px-4 text-sm">
                  Register
                </Button>
              </Link>
            </>
          )}

          {user?.role === "EMPLOYER" && (
            <Link href="/post-job">
              <Button className="rounded-full h-9 px-4 text-sm">
                Post a Job
              </Button>
            </Link>
          )}

          {user && <UserDropdown />}
        </div>
      </nav>
    </header>
  );
}
