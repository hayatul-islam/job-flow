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
import { Button } from "../ui/button";

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
          <Button
            key={tab}
            onClick={() => handleClick(tab)}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "h-8 flex items-center gap-1.5 !px-4 rounded-full text-xs",
              isActive
                ? ""
                : "bg-transparent hover:text-primary hover:border-primary/20",
            )}
          >
            <Icon className="!w-3 !h-3 shrink-0" />
            {label}
          </Button>
        );
      })}
    </div>
  );
}
