"use client";

import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/types";
import JobCardV2 from "../home/JobCardTwo";
import { JobsSkeletonList } from "../skeletons/JobSkeleton";
import EmptyJobs from "./EmptyJobs";

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
      {!isLoading && (
        <p className="text-sm text-black/70">
          Showing{" "}
          <span className="font-semibold text-black">{data?.data?.length}</span>{" "}
          results
        </p>
      )}

      {isLoading ? (
        <JobsSkeletonList />
      ) : data?.data?.length > 0 ? (
        <div className="grid gap-3">
          {data?.data?.map((job: Job) => (
            <JobCardV2 key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyJobs />
      )}
    </div>
  );
}
