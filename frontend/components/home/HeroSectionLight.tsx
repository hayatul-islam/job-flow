"use client";

import { useJobs } from "@/hooks/useJobs";
import { Job } from "@/types";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useRef } from "react";
import LiveJobFeedSkeleton from "../skeletons/LiveJobFeedSkeleton";
import JobSearchBar from "./JobSearchBar";

const avatarColors = ["#f97316", "#a78bfa", "#34d399", "#60a5fa", "#f472b6"];
const avatarLabels = ["A", "B", "C", "D", "E"];

export default function HeroSectionLight() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  const { data, isLoading } = useJobs({
    q: "",
    location: [],
    catId: "",
    jobType: [],
  });

  const liveJobs = data?.data?.slice(0, 4);
  const tickerItems =
    liveJobs?.map(
      (job: Job) => `${job.title} · ৳${job.salary} · ${job.location}`,
    ) || [];

  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    const speed = 0.7;
    const tick = () => {
      const halfW = el.scrollWidth / 2;
      posRef.current -= speed;
      if (Math.abs(posRef.current) >= halfW) posRef.current = 0;
      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      className="relative min-h-auto overflow-hidden pb-12"
      style={{
        background:
          "linear-gradient(165deg, #faf9ff 0%, #f0eeff 40%, #e8f4ff 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(91,79,207,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,79,207,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: -120,
          left: -80,
          width: 480,
          height: 480,
          background:
            "radial-gradient(circle, rgba(91,79,207,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          bottom: -80,
          right: -100,
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(123,111,224,0.10) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          top: "30%",
          left: "40%",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(91,79,207,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mt-32 z-10 flex-1 container w-full grid lg:grid-cols-5 gap-12 items-center pb-16">
        <div className="lg:col-span-3">
          <div
            className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-normal"
            style={{
              background: "rgba(91,79,207,0.10)",
              border: "1px solid rgba(91,79,207,0.20)",
              color: "var(--primary)",
            }}
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: "#16a05a" }}
            />
            2,400 jobs added this week
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-8">
            <span className="block">Land your</span>
            <span
              className="block"
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 50%, var(--primary-100) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              dream job
            </span>
            <span
              className="block"
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "0.82em",
                color: "#6b6b8a",
              }}
            >
              without the grind.
            </span>
          </h1>

          <p
            className="mb-9 max-w-xl leading-relaxed"
            style={{ fontSize: 17, color: "#6b6b8a" }}
          >
            Stop doomscrolling LinkedIn. WorkWave surfaces the best remote and
            hybrid roles, filtered by salary, culture fit, and growth
            trajectory.
          </p>

          <JobSearchBar />
        </div>

        <div className="flex flex-col gap-3 lg:col-span-2">
          {isLoading ? (
            <LiveJobFeedSkeleton />
          ) : (
            <div className="rounded-3xl p-6 bg-white">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-black">
                    Live Job Feed
                  </h3>
                  <p className="mt-0.5 text-xs text-black/60">
                    Updating in real-time
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full px-3 py-1 bg-green-100 border-green-500">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-green-500">
                    Live
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                {liveJobs?.length > 0 &&
                  liveJobs.map((job: Job) => (
                    <Link
                      key={job.id}
                      href={`/jobs/${job?.id}`}
                      className="group flex cursor-pointer items-center justify-between rounded-2xl px-3 py-2.5 transition-all hover:bg-gray-100 "
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex shrink-0 items-center justify-center rounded-xl text-sm font-extrabold h-[38px] w-[38px] bg-primary/5 text-primary">
                          {job.employer.firstName[0]}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-black">
                            {job.title}
                          </h4>
                          <p className="mt-0.5 text-xs text-black/60">
                            {job.employer.firstName} {job.employer.lastName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-400">
                          {moment(job.createdAt).startOf("hour").fromNow()}
                        </span>

                        <ChevronRight
                          className="text-gray-400 transition-all group-hover:translate-x-0.5"
                          size={16}
                        />
                      </div>
                    </Link>
                  ))}
              </div>

              <Link
                href={"/jobs"}
                className="block text-center w-full mt-4 w-full rounded-2xl py-3 text-sm font-medium transition-all border border-primary/20 hover:border-primary hover:bg-primary/5 active:bg-primary/10"
              >
                View all new listings →
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                val: "100%",
                label: "Verified jobs",
                accent: "var(--primary)",
              },
              {
                val: "Free",
                label: "For job seekers",
                accent: "var(--primary-light)",
              },
            ].map((s, i) => (
              <div key={i} className="rounded-[18px] p-4 bg-white">
                <h4 className="font-bold text-3xl">{s.val}</h4>
                <p className="text-xs text-black/60 pt-1">{s.label}</p>
                <div
                  className="mt-3 h-0.5 w-7 rounded-full"
                  style={{ background: s.accent }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ticker ── */}
      <div
        className={` ${tickerItems?.length > 0 ? "block" : "hidden"}   relative overflow-hidden py-3 bg-white`}
      >
        <div
          ref={tickerRef}
          className="flex whitespace-nowrap"
          style={{ willChange: "transform" }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-6 text-sm font-medium text-black/70"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
