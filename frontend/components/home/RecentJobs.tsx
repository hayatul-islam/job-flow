"use client";

import { useJobs } from "@/hooks/useJobs";
import { Job, JobsParams } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import EmptyJobs from "../jobs/EmptyJobs";
import { JobsSkeletonList } from "../skeletons/JobSkeleton";
import JobCardV2 from "./JobCardTwo";
import JobFilters from "./JobFilters";

export default function RecentJobs() {
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
  });

  const onQuery = (key: string, value: any) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const jobs: Job[] = data?.data ?? [];

  return (
    <section className="bg-light-background/40 py-20 px-4">
      <div className="container">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2>Recent jobs</h2>

            <p>
              {isLoading
                ? ""
                : `${jobs.length} position${jobs.length !== 1 ? "s" : ""} available`}
            </p>
          </div>

          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
          >
            See all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-5">
          <JobFilters onQuery={onQuery} />
        </div>

        {isLoading ? (
          <JobsSkeletonList />
        ) : jobs.length > 0 ? (
          <div className="flex flex-col gap-3">
            {jobs.map((job) => (
              <JobCardV2 key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <EmptyJobs />
        )}

        <div className="mt-8 flex justify-center sm:hidden">
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
