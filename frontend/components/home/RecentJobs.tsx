"use client";

import { useJobs } from "@/hooks/useJobs";
import { fadeUp, stagger } from "@/lib/animations";
import { Job, JobsParams, JobViewMode } from "@/types";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
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
    limit: 8,
  });

  const onQuery = (key: string, value: any) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  const jobs: Job[] = data?.data ?? [];
  const queryKey = JSON.stringify(query);

  // ── refs ──────────────────────────────────────────────────
  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const jobsRef = useRef(null);
  const bottomRef = useRef(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const filterInView = useInView(filterRef, { once: true, margin: "-60px" });
  const jobsInView = useInView(jobsRef, { once: true, margin: "-60px" });
  const bottomInView = useInView(bottomRef, { once: true });

  return (
    <section className="bg-light-background/40 py-12 md:py-20">
      <div className="container">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mb-4 md:mb-8 flex items-end justify-between"
          variants={stagger}
          initial="hidden"
          animate={headerInView ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[42px]">
              Recent jobs
            </h2>
            <p className="text-xs sm:text-sm">
              {isLoading
                ? ""
                : `${jobs.length} position${jobs.length !== 1 ? "s" : ""} available`}
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="md:hidden flex justify-end">
            <JobViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link
              href="/jobs"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
            >
              See all jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          ref={filterRef}
          className="flex items-center justify-between mb-5"
          variants={fadeUp}
          initial="hidden"
          animate={filterInView ? "show" : "hidden"}
        >
          <JobFilters onQuery={onQuery} />
          <div className="hidden md:block">
            <JobViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>
        </motion.div>

        {/* Jobs — ref টা wrapper div এ দাও */}
        <div ref={jobsRef}>
          {isLoading ? (
            <JobsSkeletonList view={viewMode} />
          ) : jobs.length > 0 ? (
            viewMode === "card" ? (
              <motion.div
                key={`card-${queryKey}`}
                className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                variants={stagger}
                initial="hidden"
                animate={jobsInView ? "show" : "hidden"}
              >
                {jobs.map((job) => (
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
                {jobs.map((job) => (
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

        {/* Mobile see all */}
        <motion.div
          ref={bottomRef}
          className="mt-8 flex justify-center md:hidden"
          variants={fadeUp}
          initial="hidden"
          animate={bottomInView ? "show" : "hidden"}
        >
          <Link
            href="/jobs"
            className="flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            See all jobs <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import { useJobs } from "@/hooks/useJobs";
// import { Job, JobsParams, JobViewMode } from "@/types";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import EmptyJobs from "../jobs/EmptyJobs";
// import JobViewModeToggle from "../jobs/JobViewModeToggle";
// import { JobsSkeletonList } from "../skeletons/JobSkeleton";

// import JobCard from "./JobCard";
// import JobCardGrid from "./JobCardGrid";
// import JobFilters from "./JobFilters";

// export default function RecentJobs() {
//   const [viewMode, setViewMode] = useState<JobViewMode>("card");
//   const [query, setQuery] = useState<JobsParams>({
//     jobType: [],
//     q: "",
//     location: [],
//     catId: "",
//   });

//   const { data, isLoading } = useJobs({
//     q: query.q ?? "",
//     location: query.location ?? [],
//     catId: query.catId?.toString() ?? "",
//     jobType: query.jobType ?? [],
//     limit: 8,
//   });

//   const onQuery = (key: string, value: any) => {
//     setQuery((prev) => ({ ...prev, [key]: value }));
//   };

//   const jobs: Job[] = data?.data ?? [];

//   return (
//     <section className="bg-light-background/40 py-12 md:py-20">
//       <div className="container">
//         <div className="mb-4 md:mb-8 flex items-end justify-between">
//           <div>
//             <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[42px]">
//               Recent jobs
//             </h2>
//             <p className="text-xs sm:text-sm">
//               {isLoading
//                 ? ""
//                 : `${jobs.length} position${jobs.length !== 1 ? "s" : ""} available`}
//             </p>
//           </div>

//           <div className="md:hidden flex justify-end">
//             <JobViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
//           </div>
//           <Link
//             href="/jobs"
//             className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5"
//           >
//             See all jobs <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>

//         <div className="flex items-center justify-between mb-5">
//           <JobFilters onQuery={onQuery} />

//           <div className="hidden md:block">
//             <JobViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
//           </div>
//         </div>

//         {isLoading ? (
//           <JobsSkeletonList view={viewMode} />
//         ) : jobs.length > 0 ? (
//           viewMode === "card" ? (
//             <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//               {jobs.map((job) => (
//                 <JobCard key={job.id} job={job} />
//               ))}
//             </div>
//           ) : (
//             <div className="flex flex-col gap-3">
//               {jobs.map((job) => (
//                 <JobCardGrid key={job.id} job={job} />
//               ))}
//             </div>
//           )
//         ) : (
//           <EmptyJobs />
//         )}

//         <div className="mt-8 flex justify-center md:hidden">
//           <Link
//             href="/jobs"
//             className="flex items-center gap-1.5 text-sm font-medium text-primary"
//           >
//             See all jobs <ArrowRight className="w-4 h-4" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
