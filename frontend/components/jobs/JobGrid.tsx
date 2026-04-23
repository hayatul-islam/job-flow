"use client";

import { useJobs } from "@/hooks/useJobs";
import { JobsParams, JobViewMode } from "@/types";
import { useState } from "react";
import JobCard from "../home/JobCard";
import JobCardGrid from "../home/JobCardGrid";
import Pagination from "../shared/Pagination";
import { JobsSkeletonList } from "../skeletons/JobSkeleton";
import EmptyJobs from "./EmptyJobs";
import JobViewModeToggle from "./JobViewModeToggle";

interface JobsGridProps {
  query: {
    q: string;
    location: string[];
    catId: string | number;
    jobType: string[];
    page?: number;
    limit?: number;
  };
  onQuery: (key: keyof JobsParams, value: any) => void;
}

export default function JobsGrid({ query, onQuery }: JobsGridProps) {
  const [viewMode, setViewMode] = useState<JobViewMode>("grid");
  const { data, isLoading } = useJobs({
    q: query?.q ?? "",
    location: query?.location ?? [],
    catId: query?.catId?.toString() ?? "",
    jobType: query?.jobType ?? [],
    page: Number(query?.page ?? 1),
    limit: Number(query?.limit ?? 12),
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-black/70">
          Showing{" "}
          <span className="font-semibold text-black">{data?.data?.length}</span>{" "}
          results
        </p>

        <JobViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      {isLoading ? (
        <JobsSkeletonList view={viewMode} />
      ) : data?.data?.length > 0 ? (
        viewMode === "card" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3  gap-3">
            {data?.data?.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data?.data?.map((job) => (
              <JobCardGrid key={job.id} job={job} />
            ))}
          </div>
        )
      ) : (
        <EmptyJobs />
      )}

      {data?.pagination && (
        <div className="mt-8">
          <Pagination pagination={data?.pagination} onPageChange={onQuery} />
        </div>
      )}
    </div>
  );
}
