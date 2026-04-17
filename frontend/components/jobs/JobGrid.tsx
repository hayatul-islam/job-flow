"use client";

import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/types";
import JobCardV2 from "../home/JobCardTwo";

interface JobsGridProps {
  query: {
    q: string;
    location: string[];
    catId: string | number;
    jobType: string[];
  };
}

export default function JobsGrid({ query }: JobsGridProps) {
  const { data, isLoading } = useJobs({
    q: query?.q ?? "",
    location: query?.location ?? [],
    catId: query?.catId?.toString() ?? "",
    jobType: query?.jobType ?? [],
  });

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {data?.data?.length}
          </span>{" "}
          results
        </p>
      </div>

      {/* Jobs Grid */}
      {data?.data?.length > 0 ? (
        <div className="grid gap-6">
          {data?.data?.map((job: Job) => (
            <JobCardV2 key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-600 text-lg">
            No jobs found matching your criteria.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  );
}
