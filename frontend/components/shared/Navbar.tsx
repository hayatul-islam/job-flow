"use client";

import Logo from "./Logo";

export default function Navbar() {
  return (
    <section className="bg-transparent fixed w-full top-0 left-0 backdrop-blur-sm bg-opacity-80 z-50">
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
          <button className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors font-medium">
            Login
          </button>
          <button className="px-5 py-2 text-sm font-semibold text-white rounded-xl transition-all bg-primary-gradient hover:opacity-90">
            Post a Job
          </button>
        </div>
      </nav>
    </section>
  );
}
