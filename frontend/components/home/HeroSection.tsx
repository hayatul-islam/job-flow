"use client";

import { useEffect, useState } from "react";

const tickerItems = [
  "Senior Engineer · $220K · Remote",
  "UX Lead · $145K · New York",
  "Data Scientist · $180K · Remote",
  "Product Manager · $160K · SF",
  "DevOps Engineer · $195K · Austin",
  "Brand Designer · $110K · London",
  "ML Researcher · $250K · Remote",
  "Growth Marketer · $95K · Berlin",
];

const liveJobs = [
  {
    company: "Linear",
    role: "Founding Designer",
    time: "2m ago",
    dot: "bg-green-400",
  },
  {
    company: "Vercel",
    role: "Senior SRE",
    time: "8m ago",
    dot: "bg-green-400",
  },
  {
    company: "Loom",
    role: "Product Lead",
    time: "14m ago",
    dot: "bg-yellow-400",
  },
  {
    company: "Arc",
    role: "iOS Engineer",
    time: "21m ago",
    dot: "bg-green-400",
  },
];

export default function HeroSection() {
  const [tickerOffset, setTickerOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerOffset((prev) => (prev - 1) % (tickerItems.length * 280));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-black flex flex-col overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      <div className=" absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[120px]" />
      <div className=" absolute bottom-[-150px] right-[-200px] w-[500px] h-[500px] rounded-full bg-indigo-700/10 blur-[100px]" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative mt-32 z-10 flex-1 container w-full grid lg:grid-cols-5 gap-12 items-center pb-16">
        {/* Left — 3 cols */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-2 mb-8">
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold 
    text-gray-300 bg-transparent border border-gray-700 backdrop-blur-sm"
            >
              ● 2,400 jobs added this week
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-white mb-8">
            <span className="block">Land your</span>
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary-light), var(--primary), var(--primary-dark))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              dream job
            </span>
            <span className="block text-white/60 text-4xl md:text-5xl lg:text-6xl font-light mt-2">
              without the grind.
            </span>
          </h1>

          <p className="text-lg text-white/40 leading-relaxed max-w-xl mb-10">
            Stop doomscrolling LinkedIn. WorkWave surfaces the best remote and
            hybrid roles, filtered by salary, culture fit, and growth
            trajectory.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <svg
                className="w-5 h-5 text-white/30"
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
                placeholder="Search 48K+ roles..."
                className="flex-1 bg-transparent text-white placeholder-white/25 outline-none text-sm"
              />
            </div>
            <button className="shrink-0 px-8 py-4 rounded-2xl text-sm font-bold text-white  bg-primary-gradient transition-all hover:opacity-90 hover:scale-105 active:scale-95">
              Find Roles →
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {["#f97316", "#a78bfa", "#34d399", "#60a5fa", "#f472b6"].map(
                (color, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[#0f0f23] flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    {["A", "B", "C", "D", "E"][i]}
                  </div>
                ),
              )}
            </div>
            <div>
              <div className="text-white font-semibold text-sm">
                2.4M+ professionals
              </div>
              <div className="text-white/40 text-xs mt-0.5">
                found their next role here
              </div>
            </div>
          </div>
        </div>

        {/* Right — live feed card */}
        <div className="lg:col-span-2">
          {/* Glassmorphism card */}
          <div
            className="rounded-3xl p-6 border"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-white font-bold text-base mb-0.5">
                  Live Job Feed
                </div>
                <div className="text-white/40 text-xs">
                  Updating in real-time
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Live</span>
              </div>
            </div>

            <div className="space-y-3">
              {liveJobs.map((job, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-2xl transition-all hover:bg-white/5 cursor-pointer group"
                  style={{ border: "0.5px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {job.company[0]}
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">
                        {job.role}
                      </div>
                      <div className="text-white/40 text-xs mt-0.5">
                        {job.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${job.dot}`} />
                    <span className="text-white/30 text-xs">{job.time}</span>
                    <svg
                      className="w-3.5 h-3.5 text-white/20 group-hover:text-white/60 transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-5 py-3 rounded-2xl text-sm text-white/50 hover:text-white/80 transition-colors border border-white/10 hover:border-white/20 font-medium">
              View all new listings →
            </button>
          </div>

          {/* Floating mini stat cards */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {[
              { val: "48K+", sub: "Live jobs", color: "#7c3aed" },
              { val: "$142K", sub: "Avg salary", color: "#0ea5e9" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 border"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div className="text-2xl font-black text-white mb-0.5">
                  {s.val}
                </div>
                <div className="text-xs text-white/40">{s.sub}</div>
                <div
                  className="w-8 h-0.5 mt-3 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker tape */}
      <div className="relative z-10 border-y border-white/5 bg-white/[0.02] py-3 mb-12 overflow-hidden">
        <div
          className="flex gap-0 whitespace-nowrap"
          style={{
            transform: `translateX(${tickerOffset}px)`,
            transition: "none",
          }}
        >
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-6 text-sm text-white/40"
            >
              <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
