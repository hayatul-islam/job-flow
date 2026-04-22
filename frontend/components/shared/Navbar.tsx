"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import UserDropdown from "./UserDropdown";

// Animated hamburger → X icon
function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="w-5 h-5 flex flex-col justify-center items-center gap-[5px]">
      <span
        className={`block h-[1.5px] bg-black rounded-full transition-all duration-300 origin-center ${
          open ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"
        }`}
      />
      <span
        className={`block h-[1.5px] bg-black rounded-full transition-all duration-300 ${
          open ? "w-0 opacity-0" : "w-3.5 opacity-100"
        }`}
      />
      <span
        className={`block h-[1.5px] bg-black rounded-full transition-all duration-300 origin-center ${
          open ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"
        }`}
      />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const isHome = pathname === "/";
  const isActive = (href: string) => pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
          isHome
            ? scrolled
              ? "bg-white backdrop-blur-md border-b border-black/5"
              : "bg-transparent border-b border-black/3"
            : "bg-white backdrop-blur-md border-b border-black/5"
        }`}
      >
        <nav className="container flex items-center justify-between px-6 lg:px-16 h-16">
          <Logo color="black" />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
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
                    Crate Account
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

          <div className="flex md:hidden items-center gap-2">
            {user && <UserDropdown />}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-lg hover:bg-black/5 transition-all"
              aria-label="Toggle menu"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile navbar   */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-white/80 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={`absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl rounded-b-3xl mx-3 overflow-hidden transition-all duration-300 ease-out ${
            menuOpen
              ? "opacity-100 translate-y-0 max-h-[600px]"
              : "opacity-0 -translate-y-4 max-h-0"
          }`}
        >
          <div className="flex flex-col items-center py-8 gap-1">
            <Link
              href="/jobs"
              onClick={() => setMenuOpen(false)}
              className={`w-full text-center px-6 py-3.5 text-[16px] font-medium transition-all ${
                isActive("/jobs")
                  ? "text-primary font-medium"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Browse Jobs
            </Link>

            {user?.role === "EMPLOYER" && (
              <Link
                href="/post-job"
                onClick={() => setMenuOpen(false)}
                className={`w-full text-center px-6 py-3.5 text-[16px] font-medium transition-all ${
                  isActive("/post-job")
                    ? "text-primary font-medium"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                Post a Job
              </Link>
            )}
          </div>

          {!user && (
            <div className="flex flex-col gap-3 px-6 pb-8">
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full h-12 rounded-2xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                  <LogIn size={15} />
                  Login
                </button>
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>
                <Button className="w-full h-12 rounded-2xl text-sm flex items-center justify-center gap-2">
                  <UserPlus size={15} />
                  Create account
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
