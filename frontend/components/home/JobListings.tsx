"use client";

import { MOCK_JOBS } from "@/lib/data";
import { Job } from "@/types";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import JobCard from "./JobCard";
import JobFilters from "./JobFilters";

export default function JobListings() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered: Job[] = MOCK_JOBS.filter((job) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Remote") return job.workMode === "Remote";
    if (activeFilter === "Full-time") return job.jobType === "Full-time";
    if (activeFilter === "Part-time") return job.jobType === "Part-time";
    // Senior / Entry Level — in a real app these would come from the job data
    return true;
  });

  return (
    <section className="py-10 px-4 bg-[#f7f7f5]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Latest Jobs
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-light">
              {filtered.length} positions available
            </p>
          </div>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
          >
            See all jobs <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <JobFilters onFilterChange={setActiveFilter} />
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-sm">No jobs found for this filter.</p>
          </div>
        )}

        {/* Mobile see all */}
        <div className="flex justify-center mt-7 sm:hidden">
          <Link
            href="/jobs"
            className="flex items-center gap-1 text-primary text-sm font-medium"
          >
            See all jobs <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
