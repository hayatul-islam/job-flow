"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LOCATIONS, STATS } from "@/lib/data";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (location && location !== "All Locations")
      params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <section className="bg-[#1a1a2e] pt-16 pb-14 px-4 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#0f3460]/40 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-primary/15 text-primary text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Bangladesh's Fastest Growing Job Platform
        </div>

        {/* Heading */}
        <h1 className="text-white font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-2xl mb-4">
          Find Your <span className="text-primary">Dream Job</span>
          <br />
          Without the Noise
        </h1>

        <p className="text-white/50 text-base sm:text-lg font-light max-w-xl mb-10 leading-relaxed">
          Thousands of verified listings from top companies. Apply in minutes,
          track your applications in real-time.
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-xl overflow-hidden shadow-2xl max-w-2xl gap-0">
          <div className="flex items-center flex-1 px-4 gap-3">
            <SearchIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Job title, keyword..."
              className="border-0 shadow-none focus-visible:ring-0 p-0 text-sm placeholder:text-gray-400"
            />
          </div>

          <div className="hidden sm:block w-px bg-gray-200 my-3" />

          <div className="sm:w-44 border-t sm:border-t-0 border-gray-100">
            <Select onValueChange={setLocation}>
              <SelectTrigger className="border-0 shadow-none focus:ring-0 h-full rounded-none text-sm text-gray-500 px-4">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary-100 text-white rounded-none sm:rounded-r-xl rounded-b-xl sm:rounded-b-none text-sm font-medium px-6 py-6 border-0"
          >
            Search Jobs
          </Button>
        </div>

        {/* Popular searches */}
        <div className="flex flex-wrap items-center gap-2 mt-5">
          <span className="text-white/30 text-xs">Popular:</span>
          {["React Developer", "UI Designer", "Data Analyst", "Remote"].map(
            (term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  router.push(`/jobs?q=${encodeURIComponent(term)}`);
                }}
                className="text-white/50 hover:text-white text-xs border border-white/10 hover:border-white/30 px-3 py-1 rounded-full transition-colors"
              >
                {term}
              </button>
            ),
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="text-white font-serif text-2xl font-bold">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs font-light mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
