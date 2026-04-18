"use client";

import { JOB_FILTER_TABS, JOB_TYPE_CONFIG } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Building2,
  Clock,
  FileText,
  GitMerge,
  LayoutGrid,
  Wifi,
} from "lucide-react";
import { useState } from "react";

interface JobFiltersProps {
  onQuery?: (key: string, value: any) => void;
}

const TAB_ICONS: Record<string, React.ElementType> = {
  ALL: LayoutGrid,
  FULLTIME: Briefcase,
  PARTTIME: Clock,
  REMOTE: Wifi,
  HYBRID: GitMerge,
  CONTRACT: FileText,
  ONSITE: Building2,
};

export default function JobFilters({ onQuery }: JobFiltersProps) {
  const [active, setActive] = useState("ALL");

  function handleClick(tab: string) {
    setActive(tab);
    onQuery?.("jobType", tab === "ALL" ? [] : [tab.toUpperCase()]);
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {JOB_FILTER_TABS.map((tab) => {
        const isActive = active === tab;
        const Icon = TAB_ICONS[tab.toUpperCase()] ?? LayoutGrid;
        const label = JOB_TYPE_CONFIG[tab.toUpperCase()]?.label || tab;

        return (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-150",
              isActive
                ? "text-white"
                : "bg-white text-[#6b6b8a] hover:text-[#5B4FCF] hover:border-[rgba(91,79,207,0.45)] hover:bg-[rgba(91,79,207,0.04)]",
            )}
            style={{
              background: isActive ? "#5B4FCF" : "white",
              border: `0.5px solid ${isActive ? "#5B4FCF" : "rgba(91,79,207,0.2)"}`,
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.1px",
            }}
          >
            <Icon className="w-3 h-3 shrink-0" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
