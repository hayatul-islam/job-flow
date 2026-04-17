"use client";

import { useState } from "react";

const categories = [
  { icon: "⬡", label: "Engineering", count: "8,240" },
  { icon: "◈", label: "Design", count: "3,180" },
  { icon: "◉", label: "Product", count: "2,640" },
  { icon: "◎", label: "Marketing", count: "1,920" },
  { icon: "◆", label: "Data & AI", count: "4,510" },
  { icon: "◇", label: "Finance", count: "1,340" },
];

const featuredJobs = [
  {
    role: "Senior Product Designer",
    company: "Figma",
    location: "San Francisco",
    salary: "$160K–$210K",
    tag: "Hot",
    tagColor: "bg-rose-100 text-rose-700",
  },
  {
    role: "Staff Engineer, Platform",
    company: "Stripe",
    location: "Remote",
    salary: "$220K–$280K",
    tag: "New",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    role: "AI Research Scientist",
    company: "Anthropic",
    location: "Remote",
    salary: "$300K+",
    tag: "Featured",
    tagColor: "bg-amber-100 text-amber-700",
  },
];

export default function HeroDesign2() {
  const [activeTab, setActiveTab] = useState("For You");

  return (
    <section
      className="min-h-screen bg-[#F7F4EE] flex flex-col"
      style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
    >
      {/* Top nav bar */}
      <nav className="flex items-center justify-between px-8 lg:px-16 py-5 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-stone-900 rounded-sm flex items-center justify-center">
            <span
              className="text-white text-xs font-bold tracking-widest"
              style={{ fontFamily: "sans-serif" }}
            >
              JB
            </span>
          </div>
          <span className="text-stone-900 text-xl font-bold tracking-tight">
            Jobbly
          </span>
        </div>
        <div
          className="hidden md:flex items-center gap-8 text-sm text-stone-500"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <a href="#" className="hover:text-stone-900 transition-colors">
            Browse
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            Companies
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            Salary Guide
          </a>
          <a href="#" className="hover:text-stone-900 transition-colors">
            Resources
          </a>
        </div>
        <div
          className="flex gap-3"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          <button className="px-4 py-2 text-sm text-stone-700 hover:text-stone-900 font-medium transition-colors">
            Log in
          </button>
          <button className="px-5 py-2 text-sm bg-stone-900 text-white rounded-full font-medium hover:bg-stone-700 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-16 pt-16 pb-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div>
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-8"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <div className="h-px w-10 bg-stone-400" />
            <span className="text-sm text-stone-500 tracking-widest uppercase font-medium">
              The career platform
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-stone-900 leading-[1.08] mb-8">
            Your next
            <br />
            <em className="italic text-stone-500">great</em> role
            <br />
            awaits you.
          </h1>

          <p
            className="text-lg text-stone-500 leading-relaxed mb-10 max-w-md"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Curated opportunities from companies that invest in their people. No
            noise — just the roles that match your level and ambition.
          </p>

          {/* Search */}
          <div
            className="relative mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <div className="flex items-center bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="flex-1 flex items-center gap-3 px-5 py-4">
                <svg
                  className="w-4 h-4 text-stone-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Role, skill, or company..."
                  className="flex-1 outline-none text-stone-700 placeholder-stone-300 text-base"
                />
              </div>
              <button className="m-2 px-6 py-3 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-700 transition-colors whitespace-nowrap">
                Search
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 mb-6 bg-stone-200/60 p-1 rounded-xl w-fit"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {["For You", "Remote", "Trending"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Featured job cards */}
          <div
            className="space-y-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {featuredJobs.map((job, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 border border-stone-100 hover:border-stone-300 hover:shadow-sm transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-stone-700 font-bold text-sm">
                    {job.company[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-stone-800 group-hover:text-stone-900 transition-colors">
                      {job.role}
                    </div>
                    <div className="text-xs text-stone-400 mt-0.5">
                      {job.company} · {job.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${job.tagColor}`}
                  >
                    {job.tag}
                  </span>
                  <span className="text-xs text-stone-400 hidden sm:block">
                    {job.salary}
                  </span>
                  <svg
                    className="w-4 h-4 text-stone-300 group-hover:text-stone-600 group-hover:translate-x-0.5 transition-all"
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
        </div>

        {/* Right column — categories grid */}
        <div className="hidden lg:block">
          <p
            className="text-xs text-stone-400 tracking-widest uppercase mb-6"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Browse by category
          </p>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="text-3xl mb-4 text-stone-400 group-hover:text-stone-600 transition-colors">
                  {cat.icon}
                </div>
                <div className="text-base font-bold text-stone-800 mb-1">
                  {cat.label}
                </div>
                <div
                  className="text-sm text-stone-400"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {cat.count} open roles
                </div>
              </div>
            ))}
          </div>

          {/* Decorative stat */}
          <div className="mt-6 bg-stone-900 rounded-3xl p-6 text-white flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold mb-1">94%</div>
              <div
                className="text-sm text-stone-400"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Candidates found a role within 60 days
              </div>
            </div>
            <div className="text-5xl opacity-20">◎</div>
          </div>
        </div>
      </div>
    </section>
  );
}
