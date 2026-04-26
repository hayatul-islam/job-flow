"use client";
import { useCounter } from "@/hooks/useCounter";
import { useJobs } from "@/hooks/useJobs";
import { cardVariant, fadeUp, staggerContainer } from "@/lib/animations";
import { Job } from "@/types";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import Marquee from "../shared/Marquee";
import LiveJobFeedSkeleton from "../skeletons/LiveJobFeedSkeleton";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import JobSearchBar from "./JobSearchBar";

export default function HeroSection() {
  const { data, isLoading } = useJobs({
    q: "",
    location: [],
    catId: "",
    jobType: [],
  });

  const liveJobs = data?.data?.slice(0, 4);
  const tickerItems =
    data?.data?.map(
      (job: Job) => `${job.title} · ৳${job.salary} · ${job.location}`,
    ) || [];

  const jobCount = useCounter(100, 1800);

  return (
    <section className="relative overflow-hidden pb-12 bg-light-background">
      <div className="relative z-10 container mt-24 lg:mt-32 grid w-full flex-1 items-center gap-12 pb-8 lg:pb-16 lg:grid-cols-5 px-6 lg:px-8">
        <motion.div
          className="lg:col-span-3 flex flex-col items-center text-center lg:items-start lg:text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="hidden md:inline-flex mb-2 md:mb-4 items-center gap-2 rounded-full border-primary/10 bg-primary/3 px-4 py-2 text-[10px] sm:text-xs text-primary"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            <span>Open new opportunities</span>
          </motion.div>

          <motion.h1
            className="mb-4 lg:mb-8 font-bold max-w-lg"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {["Find your", "dream job", "faster than ever."].map((line, i) => (
              <motion.span
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className={`lg:block ${i === 1 ? "lg:italic" : ""} ${
                  i === 2 ? "lg:italic lg:font-light lg:text-[0.83em]" : ""
                }`}
              >
                {line}{" "}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="pb-6 lg:mb-9 max-w-xl leading-relaxed text-[14px] md:text-[16px]"
          >
            Discover opportunities that move your career forward. Take the next
            step with confidence.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            <JobSearchBar />
          </motion.div>
        </motion.div>

        <div className="hidden lg:flex flex-col gap-3 lg:col-span-2">
          {isLoading ? (
            <LiveJobFeedSkeleton />
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <Card className="">
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <h6>Live Job Feed</h6>
                    <p className="mt-0.5 text-xs">Updating in real-time</p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-100 px-3 py-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                      Live
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  {liveJobs?.length > 0 &&
                    liveJobs.map((job: Job) => (
                      <motion.div key={job.id} variants={cardVariant}>
                        <Link
                          href={`/jobs/${job.id}`}
                          className="group flex items-center justify-between rounded-2xl px-3 py-2.5 transition hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-primary/5 text-sm font-extrabold text-primary">
                              {job?.employer?.firstName[0]}
                            </div>
                            <div>
                              <h6>{job?.title}</h6>
                              <p className="mt-0.5 text-xs">
                                {job?.employer?.firstName}{" "}
                                {job?.employer?.lastName}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="text-xs text-gray-500">
                              {moment(job?.createdAt || "")
                                .startOf("hour")
                                .fromNow()}
                            </span>
                            <ChevronRight
                              size={16}
                              className="text-gray-500 transition group-hover:translate-x-0.5"
                            />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                </div>

                <motion.div variants={cardVariant}>
                  <Link href="/jobs">
                    <Button variant={"outline"} className="w-full mt-4">
                      View all new listings →
                    </Button>
                  </Link>
                </motion.div>
              </Card>
            </motion.div>
          )}

          <motion.div
            className="grid grid-cols-2 gap-2.5"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {[
              { val: "100", label: "Verified jobs" },
              { val: "Free", label: "For job seekers" },
            ].map((s, i) => (
              <motion.div key={i} variants={cardVariant}>
                <Card className="space-y-2">
                  <h3 className="font-bold">
                    {i === 0 ? `${jobCount.toLocaleString()}%` : s.val}
                  </h3>
                  <p className="text-xs">{s.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <Marquee data={tickerItems} />
    </section>
  );
}
