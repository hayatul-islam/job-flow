"use client";

import { Card } from "@/components/ui/card";
import { JOB_FILTER_TABS, LOCATIONS } from "@/lib/data";
import { JobsParams } from "@/types";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SectionKey = "location" | "jobType";

interface JobsFiltersProps {
  query: JobsParams;
  onQuery: (key: keyof JobsParams, value: any) => void;
}

export default function JobsFilters({ query, onQuery }: JobsFiltersProps) {
  const searchParams = useSearchParams();

  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >({
    location: true,
    jobType: true,
  });

  useEffect(() => {
    const catId = searchParams.get("catId");
    if (catId) {
      onQuery("catId", catId);
    }
  }, [searchParams]);

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleArray = (key: "location" | "jobType", value: string) => {
    const current = (query[key] as string[]) || [];

    if (current.includes(value)) {
      onQuery(
        key,
        current.filter((item) => item !== value),
      );
    } else {
      onQuery(key, [...current, value]);
    }
  };

  const handleClear = () => {
    onQuery("q", "");
    onQuery("location", []);
    onQuery("jobType", []);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search jobs..."
        value={query.q || ""}
        onChange={(e) => onQuery("q", e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      />

      <h3 className="font-bold">Filters</h3>

      {/* Location */}
      <Card className="p-4">
        <button
          onClick={() => toggleSection("location")}
          className="flex justify-between w-full"
        >
          <span>Location</span>
          <ChevronDown
            className={expandedSections.location ? "rotate-180" : ""}
          />
        </button>

        {expandedSections.location && (
          <div className="mt-3 space-y-2">
            {LOCATIONS.map((loc) => (
              <label key={loc} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={(query.location as string[])?.includes(loc)}
                  onChange={() => toggleArray("location", loc)}
                />
                {loc}
              </label>
            ))}
          </div>
        )}
      </Card>

      {/* Job Type */}
      <Card className="p-4">
        <button
          onClick={() => toggleSection("jobType")}
          className="flex justify-between w-full"
        >
          <span>Job Type</span>
          <ChevronDown
            className={expandedSections.jobType ? "rotate-180" : ""}
          />
        </button>

        {expandedSections.jobType && (
          <div className="mt-3 space-y-2">
            {JOB_FILTER_TABS.map((type) => {
              if (type === "ALL") return null;

              return (
                <label key={type} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={(query.jobType as string[])?.includes(type)}
                    onChange={() => toggleArray("jobType", type)}
                  />
                  {type}
                </label>
              );
            })}
          </div>
        )}
      </Card>

      {/* Clear */}
      <button onClick={handleClear} className="w-full border py-2 rounded">
        Clear Filters
      </button>
    </div>
  );
}
