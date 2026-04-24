"use client";

import { JOB_TYPE_CONFIG } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import { Job } from "@/types";
import { Clock, MapPin, Tag } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/card";

interface JobCardProps {
  job: Job;
}

export default function JobCardGrid({ job }: JobCardProps) {
  const employerName = `${job?.employer?.firstName} ${job?.employer?.lastName}`;
  const JobTypeIcon = JOB_TYPE_CONFIG[job?.jobType]?.icon;
  const isNew = timeAgo(job?.createdAt || "") === "Today";
  const employerFirstLetter = employerName?.[0]?.toUpperCase() || "A";

  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="sm:hidden p-0 group block overflow-hidden hover:border-gray-400 transition-all duration-150">
        <div className="px-3.5 py-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-md bg-white border border-gray-200 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                {employerFirstLetter}
              </div>
              <span className="text-xs font-medium text-gray-600 truncate">
                {employerName}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {isNew && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 tracking-wide">
                  NEW
                </span>
              )}
              <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
                <Clock className="w-3 h-3" />
                {timeAgo(job?.createdAt || "")}
              </span>
            </div>
          </div>

          <h6 className="text-sm font-semibold text-gray-900 leading-snug">
            {job.title}
          </h6>

          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1 text-[11px] text-gray-500 truncate">
              <MapPin className="w-3 h-3 shrink-0" />
              {job.location}
            </span>
            {job.salary && (
              <span className="text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg px-2 py-0.5 shrink-0">
                ৳{job.salary}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-black/5 text-black/80">
              <JobTypeIcon className="w-3 h-3" />
              {JOB_TYPE_CONFIG[job?.jobType]?.label}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/5 text-black max-w-[100px]">
              <Tag size={10} className="shrink-0" />
              <span className="truncate">{job?.category?.name}</span>
            </span>
          </div>
        </div>
      </Card>

      <Card className="hidden sm:block p-0 group overflow-hidden hover:border-gray-400 transition-all duration-150">
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white/80 border-b border-gray-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
              {employerFirstLetter}
            </div>
            <div className="min-w-0">
              <h6>{employerName}</h6>
              <p className="flex items-center gap-1 !text-xs">
                <MapPin className="w-2.5 h-2.5 shrink-0" />
                {job.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isNew && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 tracking-wide">
                NEW
              </span>
            )}
            {job.salary && (
              <span className="text-xs font-semibold text-black bg-white border border-gray-200 rounded-lg px-2.5 py-1">
                ৳{job.salary}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <h6>{job.title}</h6>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-black/5 text-black/80">
                <JobTypeIcon className="w-3 h-3" />
                {JOB_TYPE_CONFIG[job?.jobType]?.label}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/5 text-black max-w-[100px]">
                <Tag size={10} className="shrink-0" />
                <span className="truncate">{job?.category?.name}</span>
              </span>
            </div>

            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Clock className="w-3 h-3" />
              {timeAgo(job?.createdAt || "")}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
