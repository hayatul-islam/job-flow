"use client";
import { useJobs } from "@/hooks/useJobs";
import { Job, JobsParams } from "@/types";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import JobCard from "./JobCard";
import JobFilters from "./JobFilters";

export default function JobListings() {
  const [query, setQuery] = useState<JobsParams>({
    jobType: [] as string[],
    q: "",
    location: [] as string[],
    catId: "",
  });

  const { data, isLoading } = useJobs({
    q: query?.q ?? "",
    location: query?.location ?? [],
    catId: query?.catId?.toString() ?? "",
    jobType: query?.jobType ?? [],
  });

  const onQuery = (key: string, value: any) => {
    setQuery((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl text-black leading-tight font-medium">
              Recent Jobs
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-light">
              {data?.data?.length} positions available
            </p>
          </div>
          <Link
            href="/jobs"
            className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
          >
            See all jobs <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="mb-6">
          <JobFilters onQuery={onQuery} />
        </div>

        {data?.data.length > 0 ? (
          <div className="grid gap-4">
            {data?.data.map((job: Job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <span className="text-4xl mb-3">🔍</span>
            <p className="text-sm">No jobs found for this filter.</p>
          </div>
        )}

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
