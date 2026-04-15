"use client";

import { JOB_FILTER_TABS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface JobFiltersProps {
  onFilterChange?: (filter: string) => void;
}

export default function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [active, setActive] = useState("All");

  function handleClick(tab: string) {
    setActive(tab);
    onFilterChange?.(tab);
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {JOB_FILTER_TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150",
            active === tab
              ? "bg-primary border-primary text-white shadow-sm"
              : "bg-white border-gray-200 text-gray-500 hover:border-primary hover:text-primary",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
