"use client";

import { useEffect, useRef, useState } from "react";

const floatingTags = [
  {
    label: "Remote",
    color: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  {
    label: "Full-time",
    color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    label: "Senior",
    color: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  { label: "React", color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
  { label: "Design", color: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
  {
    label: "AI/ML",
    color: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
  },
  {
    label: "Startup",
    color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  },
  {
    label: "Series B",
    color: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  },
];

const stats = [
  { value: "48K+", label: "Live Jobs" },
  { value: "12K+", label: "Companies" },
  { value: "2.4M+", label: "Candidates" },
];

export default function HeroDesign1() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen bg-[#080810] overflow-hidden flex items-center"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Dynamic radial spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(124,58,237,0.12) 0%, transparent 60%)`,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[120px]" />
      <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-700/10 blur-[100px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16">
        {/* Nav badge */}
        <div className="flex justify-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Now featuring AI-matched job recommendations
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
          <span className="block text-white/90">Find work that</span>
          <span
            className="block"
            style={{
              background:
                "linear-gradient(135deg, #a78bfa 0%, #818cf8 40%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            actually matters
          </span>
        </h1>

        <p className="text-center text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed">
          48,000 roles from companies building the future. Matched to your
          skills, values, and ambition — not just keywords.
        </p>

        {/* Search bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex-1 flex items-center gap-3 px-4">
              <svg
                className="w-5 h-5 text-white/30 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Job title, skills, or company..."
                className="flex-1 bg-transparent text-white placeholder-white/25 text-base outline-none py-3"
              />
            </div>
            <div className="flex items-center gap-3 px-4 border-t sm:border-t-0 sm:border-l border-white/10">
              <svg
                className="w-5 h-5 text-white/30 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Location or Remote"
                className="flex-1 bg-transparent text-white placeholder-white/25 text-base outline-none py-3 min-w-[140px]"
              />
            </div>
            <button
              className="shrink-0 px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              }}
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* Floating tags */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-20 max-w-2xl mx-auto">
          <span className="text-sm text-white/30 self-center mr-1">
            Trending:
          </span>
          {floatingTags.map((tag) => (
            <button
              key={tag.label}
              className={`px-3.5 py-1.5 rounded-full text-sm border font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${tag.color}`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/35 tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Company logos strip */}
        <div className="mt-20 text-center">
          <p className="text-xs text-white/20 uppercase tracking-widest mb-6">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-30">
            {["Stripe", "Notion", "Linear", "Vercel", "Figma", "Loom"].map(
              (c) => (
                <span
                  key={c}
                  className="text-white font-semibold text-lg tracking-tight"
                >
                  {c}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#080810] to-transparent pointer-events-none" />
    </section>
  );
}
