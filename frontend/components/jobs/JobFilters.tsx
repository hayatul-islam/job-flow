"use client";

import { Card } from "@/components/ui/card";
import { JOB_FILTER_TABS, LOCATIONS } from "@/lib/data";
import { JobsParams } from "@/types";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface JobsFiltersProps {
  query: JobsParams;
  onQuery: (key: string, value: string | number | string[]) => void;
}

export default function JobsFilters({ query, onQuery }: JobsFiltersProps) {
  const searchParams = useSearchParams();

  const [expandedSections, setExpandedSections] = useState({
    location: true,
    jobType: true,
  });

  useEffect(() => {
    const catId = searchParams.get("catId");
    if (catId) {
      onQuery("catId", catId);
    }
  }, [searchParams]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleArray = (key: "location" | "jobType", value: string) => {
    const current = query[key] || [];

    if (current.includes(value)) {
      onQuery(
        key,
        current.filter((item: string) => item !== value),
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
      <input
        type="text"
        placeholder="Search jobs..."
        value={query.q}
        onChange={(e) => onQuery("q", e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      />

      <h3 className="font-bold">Filters</h3>

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
                  checked={query.location?.includes(loc)}
                  onChange={() => toggleArray("location", loc)}
                />
                {loc}
              </label>
            ))}
          </div>
        )}
      </Card>

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
                    checked={query.jobType?.includes(type)}
                    onChange={() => toggleArray("jobType", type)}
                  />
                  {type}
                </label>
              );
            })}
          </div>
        )}
      </Card>

      <button onClick={handleClear} className="w-full border py-2 rounded">
        Clear Filters
      </button>
    </div>
  );
}
