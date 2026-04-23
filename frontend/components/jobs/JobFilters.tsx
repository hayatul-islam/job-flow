"use client";

import { JOB_FILTER_TAGS_OPTIONS, LOCATIONS_OPTIONS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { JobsParams } from "@/types";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";

type SectionKey = "location" | "jobType";

interface JobsFiltersProps {
  query: JobsParams;
  onQuery: (key: keyof JobsParams, value: any) => void;
}

export default function JobsFilters({ query, onQuery }: JobsFiltersProps) {
  const searchParams = useSearchParams();

  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    return { location: !isMobile, jobType: !isMobile };
  });

  const [searchValue, setSearchValue] = useState(query.q || "");

  useEffect(() => {
    const catId = searchParams.get("catId");
    if (catId) onQuery("catId", catId);
  }, [searchParams]);

  // debounce hook
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
    items: { label: string; value: string }[];
  }[] = [
    {
      key: "location",
      label: "Location",
      count: locationCount,
      accentColor: "bg-blue-500",
      items: LOCATIONS_OPTIONS,
    },
    {
      key: "jobType",
      label: "Job Type",
      count: jobTypeCount,
      accentColor: "bg-emerald-500",
      items: JOB_FILTER_TAGS_OPTIONS,
    },
  ];

  return (
    <Card className="p-0 w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-50">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-semibold tracking-wide text-slate-700">
            Filters
          </span>
        </div>

        {totalActive > 0 && (
          <span className="rounded-full bg-black/5 border border-black/5 px-2.5 py-0.5 text-[11px] font-semibold text-black/80">
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
            className="w-full rounded-lg bg-white border border-black/10 pl-9 pr-3 py-2 text-sm text-black placeholder:text-slate-400 focus:outline-none focus:border-primary/70 transition-all"
          />
        </div>
      </div>

      {/* Sections */}
      {sections.map(({ key, label, count, items }) => (
        <div key={key} className="border-b border-slate-100 last:border-0">
          <button
            onClick={() => toggleSection(key)}
            className="group flex w-full items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800">
              {label}
            </span>

            <div className="flex items-center gap-2">
              {count > 0 && (
                <span className="rounded-full bg-black/5 border border-black/10 px-2 py-0.5 text-[10px] font-semibold text-black">
                  {count}
                </span>
              )}

              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-slate-400 transition-transform",
                  expandedSections[key] ? "rotate-180 text-black" : "",
                )}
              />
            </div>
          </button>

          {expandedSections[key] && (
            <div className="px-4 pb-3 space-y-0.5">
              {items.map((item) => {
                const checked = ((query[key] as string[]) || []).includes(
                  item.value,
                );

                return (
                  <label
                    key={item.value}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50 transition"
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-[4px] border",
                        checked
                          ? "border-black bg-black"
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
                      onChange={() => toggleArray(key, item.value)}
                    />

                    <span
                      className={cn(
                        "text-sm",
                        checked ? "font-medium text-black" : "text-black/80",
                      )}
                    >
                      {item.label}
                    </span>
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
              ? "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              : "bg-slate-100 text-slate-400 cursor-not-allowed",
          )}
        >
          Clear all filters
        </button>
      </div>
    </Card>
  );
}
