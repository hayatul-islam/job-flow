"use client";
import { useJobs } from "@/hooks/useJobs";
import { fadeUp, stagger } from "@/lib/animations";
import { Job, JobsParams, JobViewMode } from "@/types";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
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

  const queryKey = JSON.stringify(query) + viewMode;

  const jobsRef = useRef(null);
  const jobsInView = useInView(jobsRef, { once: true, margin: "-60px" });

  return (
    <div className="space-y-6">
      <motion.div
        className="flex justify-between items-center"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <p className="text-sm text-black/80">
          <span>Total: </span>
          <span className="font-semibold text-black">
            {data?.pagination?.total}
          </span>
        </p>
        <JobViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </motion.div>

      <div ref={jobsRef}>
        {isLoading ? (
          <JobsSkeletonList view={viewMode} length={8} />
        ) : data?.data?.length > 0 ? (
          viewMode === "card" ? (
            <motion.div
              key={`card-${queryKey}`}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
              variants={stagger}
              initial="hidden"
              animate={jobsInView ? "show" : "hidden"}
            >
              {data?.data?.map((job: Job) => (
                <motion.div key={job.id} variants={fadeUp}>
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`list-${queryKey}`}
              className="flex flex-col gap-3"
              variants={stagger}
              initial="hidden"
              animate={jobsInView ? "show" : "hidden"}
            >
              {data?.data?.map((job: Job) => (
                <motion.div key={job.id} variants={fadeUp}>
                  <JobCardGrid job={job} />
                </motion.div>
              ))}
            </motion.div>
          )
        ) : (
          <motion.div
            key={`empty-${queryKey}`}
            variants={fadeUp}
            initial="hidden"
            animate={jobsInView ? "show" : "hidden"}
          >
            <EmptyJobs />
          </motion.div>
        )}
      </div>

      {data?.pagination && (
        <motion.div
          className="mt-8"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Pagination pagination={data?.pagination} onPageChange={onQuery} />
        </motion.div>
      )}
    </div>
  );
}
