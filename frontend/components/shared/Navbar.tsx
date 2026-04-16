"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BriefcaseIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Salary Guide", href: "/salary" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#1a1a2e] sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BriefcaseIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight font-serif">
              Job<span className="text-primary">.</span>Flow
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20 text-sm"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/register?role=employer">
              <Button className="bg-primary hover:bg-primary-100 text-white text-sm border-0">
                Post a Job
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-200",
            mobileOpen ? "max-h-64 pb-4" : "max-h-0",
          )}
        >
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/60 hover:text-white text-sm px-2 py-2 rounded-md hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
              <Link href="/login" className="flex-1">
                <Button
                  variant="ghost"
                  className="w-full text-white/70 border border-white/20 text-sm"
                >
                  Login
                </Button>
              </Link>
              <Link href="/auth/register?role=employer" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary-100 text-white text-sm border-0">
                  Post a Job
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
