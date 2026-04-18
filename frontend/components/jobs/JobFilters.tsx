"use client";

import { JOB_FILTER_TABS, LOCATIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { JobsParams } from "@/types";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type SectionKey = "location" | "jobType";

interface JobsFiltersProps {
  query: JobsParams;
  onQuery: (key: keyof JobsParams, value: any) => void;
}

export default function JobsFilters({ query, onQuery }: JobsFiltersProps) {
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >({ location: true, jobType: true });
  const [searchValue, setSearchValue] = useState(query.q || "");

  useEffect(() => {
    const catId = searchParams.get("catId");
    if (catId) onQuery("catId", catId);
  }, [searchParams]);

  const useDebounce = (fn: (...args: any[]) => void, delay: number) => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    return useCallback(
      (...args: any[]) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => fn(...args), delay);
      },
      [fn, delay],
    );
  };

  const debouncedSearch = useDebounce(
    useCallback((value: string) => onQuery("q", value), [onQuery]),
    400,
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    debouncedSearch(e.target.value);
  };

  const toggleSection = (section: SectionKey) =>
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));

  const toggleArray = (key: "location" | "jobType", value: string) => {
    const current = (query[key] as string[]) || [];
    onQuery(
      key,
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  const handleClear = () => {
    onQuery("q", "");
    onQuery("location", []);
    onQuery("jobType", []);
  };

  const locationCount = ((query.location as string[]) || []).length;
  const jobTypeCount = ((query.jobType as string[]) || []).length;
  const totalActive = locationCount + jobTypeCount;

  const sections: {
    key: SectionKey;
    label: string;
    count: number;
    accentColor: string;
    items: string[];
  }[] = [
    {
      key: "location",
      label: "Location",
      count: locationCount,
      accentColor: "bg-blue-500",
      items: LOCATIONS,
    },
    {
      key: "jobType",
      label: "Job Type",
      count: jobTypeCount,
      accentColor: "bg-emerald-500",
      items: JOB_FILTER_TABS.filter((t) => t !== "ALL"),
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-semibold tracking-wide text-slate-700">
            Filters
          </span>
        </div>
        {totalActive > 0 && (
          <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[11px] font-semibold text-primary/90">
            {totalActive} active
          </span>
        )}
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-slate-100">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchValue}
            onChange={handleSearch}
            className="w-full rounded-lg bg-slate-50 border border-slate-200 pl-9 pr-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-primary/70 focus:bg-white focus:ring-3 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {/* Sections */}
      {sections.map(({ key, label, count, accentColor, items }) => (
        <div key={key} className="border-b border-slate-100 last:border-0">
          <button
            onClick={() => toggleSection(key)}
            className="group flex w-full items-center justify-between px-5 py-3.5 hover:bg-slate-50/80 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full flex-shrink-0",
                  accentColor,
                )}
              />
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                {label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {count > 0 && (
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-semibold text-primary/90">
                  {count}
                </span>
              )}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-slate-400 transition-all duration-200",
                  expandedSections[key] ? "rotate-180 text-slate-600" : "",
                )}
              />
            </div>
          </button>

          {expandedSections[key] && (
            <div className="px-4 pb-3 pt-0.5 space-y-0.5">
              {items.map((item) => {
                const checked = ((query[key] as string[]) || []).includes(item);
                return (
                  <label
                    key={item}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-all",
                      checked ? "bg-indigo-50/70" : "hover:bg-slate-50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[4px] border transition-all",
                        checked
                          ? "border-primary bg-primary shadow-[0_0_0_3px_rgba(99,102,241,0.12)]"
                          : "border-slate-300 bg-white",
                      )}
                    >
                      {checked && (
                        <svg
                          className="h-2.5 w-2.5 text-white"
                          viewBox="0 0 10 8"
                          fill="none"
                        >
                          <path
                            d="M1 4l3 3 5-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleArray(key, item)}
                    />
                    <span
                      className={cn(
                        "text-sm transition-colors",
                        checked
                          ? "font-medium text-slate-800"
                          : "text-slate-500",
                      )}
                    >
                      {item}
                    </span>
                    {checked && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Clear */}
      <div className="p-4 bg-slate-50/50">
        <button
          onClick={handleClear}
          disabled={totalActive === 0 && !searchValue}
          className={cn(
            "w-full rounded-lg py-2.5 text-sm font-medium transition-all",
            totalActive > 0 || searchValue
              ? "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800 shadow-sm"
              : "bg-slate-100 border border-slate-100 text-slate-400 cursor-not-allowed",
          )}
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}
