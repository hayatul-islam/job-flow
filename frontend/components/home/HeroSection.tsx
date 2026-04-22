"use client";

import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/types";
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

  return (
    <section className="relative overflow-hidden pb-12 bg-light-background">
      <div className="relative z-10 container mt-32 grid w-full flex-1 items-center gap-12 pb-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full  border-primary/10 bg-primary/3 px-4 py-2 text-xs text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            2,400 jobs added this week
          </div>

          <h1 className="mb-8 leading-[0.95] !font-bold">
            <span className="block">Land your</span>
            <span className="block italic">dream job</span>
            <span className="block italic font-light  text-[0.83em]">
              without the grind.
            </span>
          </h1>

          <p className="mb-9 max-w-xl leading-relaxed !text-[16px]">
            Stop doom scrolling LinkedIn. WorkWave surfaces the best remote and
            hybrid roles, filtered by salary, culture fit, and growth
            trajectory.
          </p>

          <JobSearchBar />
        </div>

        <div className="flex flex-col gap-3 lg:col-span-2">
          {isLoading ? (
            <LiveJobFeedSkeleton />
          ) : (
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
                    <Link
                      key={job.id}
                      href={`/jobs/${job.id}`}
                      className="group flex items-center justify-between rounded-2xl px-3 py-2.5 transition hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-xl bg-primary/5 text-sm font-extrabold text-primary">
                          {job?.employer?.firstName[0]}
                        </div>
                        <div>
                          <h6>{job?.title}</h6>
                          <p className="mt-0.5 text-xs ">
                            {job?.employer?.firstName} {job?.employer?.lastName}
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
                  ))}
              </div>

              <Link href="/jobs">
                <Button variant={"outline"} className="w-full mt-4">
                  View all new listings →
                </Button>
              </Link>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            {[
              { val: "100%", label: "Verified jobs" },
              { val: "Free", label: "For job seekers" },
            ].map((s, i) => (
              <Card key={i} className="space-y-2">
                <h3 className="font-bold">{s.val}</h3>
                <p className="text-xs ">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Marquee data={tickerItems} />
    </section>
  );
}
