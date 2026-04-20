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

export default function JobCardV2({ job }: JobCardProps) {
  const employerName = `${job.employer.firstName} ${job.employer.lastName}`;
  const JobTypeIcon = JOB_TYPE_CONFIG[job.jobType]?.icon;
  const isNew = timeAgo(job.createdAt) === "Today";
  const initial = employerName?.[0]?.toUpperCase() || "A";

  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="p-0 group block overflow-hidden hover:border-gray-400 transition-all duration-150 ">
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-xs font-semibold text-primary shrink-0">
              {initial}
            </div>
            <div className="min-w-0">
              <h6>{employerName}</h6>
              <p className="flex items-center gap-1 !text-xs ">
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
              <span className="text-xs font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg px-2.5 py-1">
                ৳{job.salary}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <h6>{job.title}</h6>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-violet-50 text-violet-800">
                <JobTypeIcon className="w-3 h-3" />
                {JOB_TYPE_CONFIG[job.jobType]?.label}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800">
                <Tag size={10} />
                {job?.category?.name}
              </span>
            </div>

            <span className="flex items-center gap-1 text-[11px] text-gray-400">
              <Clock className="w-3 h-3" />
              {timeAgo(job.createdAt)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
