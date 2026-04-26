"use client";

import { fadeUp, stagger } from "@/lib/animations";
import { JobsParams } from "@/types";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import JobsFilters from "./JobFilters";
import JobsGrid from "./JobGrid";

export default function Jobs() {
  const searchParams = useSearchParams();

  const catId = searchParams.get("catId");
  const searchQ = searchParams.get("q");
  const jobType = searchParams.get("jobType");

  const [query, setQuery] = useState<JobsParams>({
    q: searchQ ?? "",
    location: [] as string[],
    catId: catId ?? "",
    jobType: jobType ? [jobType] : ([] as string[]),
  });

  const onQuery = (key: string, value: any) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-light-background pt-24">
      <main className="container mx-auto px-4 pb-12 pt-4">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.aside variants={fadeUp} className="lg:col-span-1">
            <JobsFilters onQuery={onQuery} query={query} />
          </motion.aside>

          <motion.section variants={fadeUp} className="lg:col-span-3">
            <JobsGrid query={query} onQuery={onQuery} />
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
