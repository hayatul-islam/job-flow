"use client";

import { JOB_TYPE_CONFIG } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import { Job } from "@/types";
import { Building2, Clock, MapPin, Tag } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const employerName = `${job?.employer?.firstName} ${job?.employer?.lastName}`;
  const JobTypeIcon = JOB_TYPE_CONFIG[job?.jobType]?.icon;
  const isNew = timeAgo(job?.createdAt || "") === "Today";

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-black/40 hover:shadow transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-stretch">
        <div className="flex items-center justify-between flex-1 px-4 py-3.5 gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700 shrink-0">
              {employerName?.[0] || "A"}
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <Link href={`/jobs/${job.id}`}>
                  <h3 className="text-sm font-semibold text-black truncate tracking-tight  transition-colors">
                    {job.title}
                  </h3>
                </Link>

                {isNew && (
                  <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 tracking-wide">
                    NEW
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium ${JOB_TYPE_CONFIG[job?.jobType]?.className}`}
                >
                  <JobTypeIcon className="w-3 h-3" />
                  {JOB_TYPE_CONFIG[job?.jobType]?.label}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-800">
                  <Tag size={10} />
                  {job?.category?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            {job.salary && (
              <span className="text-sm font-semibold text-black tracking-tight">
                ৳{job.salary}
              </span>
            )}

            <div className="flex items-center gap-2 text-[12px] text-gray-700">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {employerName}
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {job.location}
              </span>

              <span className="w-1 h-1 rounded-full bg-gray-300" />

              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeAgo(job?.createdAt || "")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
