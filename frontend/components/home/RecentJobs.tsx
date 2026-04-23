"use client";

import { useJobs } from "@/hooks/useJobs";
import { Job, JobsParams, JobViewMode } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EmptyJobs from "../jobs/EmptyJobs";
import JobViewModeToggle from "../jobs/JobViewModeToggle";
import { JobsSkeletonList } from "../skeletons/JobSkeleton";

import JobCard from "./JobCard";
import JobCardGrid from "./JobCardGrid";
import JobFilters from "./JobFilters";

export default function RecentJobs() {
  const [viewMode, setViewMode] = useState<JobViewMode>("card");
  const [query, setQuery] = useState<JobsParams>({
    jobType: [],
    q: "",
    location: [],
    catId: "",
  });

  const { data, isLoading } = useJobs({
    q: query.q ?? "",
    location: query.location ?? [],
    catId: query.catId?.toString() ?? "",
    jobType: query.jobType ?? [],
    limit: 12,
  });

  const onQuery = (key: string, value: any) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const jobs: Job[] = data?.data ?? [];

  return (
    <section className="bg-light-background/40 py-12 md:py-20">
      <div className="container">
        <div className="mb-4 md:mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[42px]">
              Recent jobs
            </h2>
            <p className="text-xs sm:text-sm">
              {isLoading
                ? ""
                : `${jobs.length} position${jobs.length !== 1 ? "s" : ""} available`}
            </p>
          </div>

          <div className="md:hidden flex justify-end">
            <JobViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
          <Link
            href="/jobs"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
          >
            See all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center justify-between mb-5">
          <JobFilters onQuery={onQuery} />

          <div className="hidden md:block">
            <JobViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </div>

        {isLoading ? (
          <JobsSkeletonList view={viewMode} />
        ) : jobs.length > 0 ? (
          viewMode === "card" ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {jobs.map((job) => (
                <JobCardGrid key={job.id} job={job} />
              ))}
            </div>
          )
        ) : (
          <EmptyJobs />
        )}

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/jobs"
            className="flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            See all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
