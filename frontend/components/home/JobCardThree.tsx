"use client";

import { JOB_TYPE_CONFIG } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import { Job } from "@/types";
import { ArrowRight, Building2, Clock, MapPin, Tag } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: Job;
  index?: number;
}

export default function JobCardV3({ job, index = 1 }: JobCardProps) {
  const employerName = `${job?.employer?.firstName} ${job?.employer?.lastName}`;
  const JobTypeIcon = JOB_TYPE_CONFIG[job?.jobType]?.icon;
  const isNew = timeAgo(job?.createdAt || "") === "Today";

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group grid bg-white border border-gray-200 rounded-xl overflow-hidden hover:bg-gray-50 transition-colors duration-100 cursor-pointer"
      style={{ gridTemplateColumns: "50px 1fr auto auto" }}
    >
      {/* Index column */}
      <div className="flex items-center justify-center bg-violet-50 border-r border-violet-100 text-xs font-semibold text-violet-700 self-stretch">
        {String(index).padStart(2, "0")}
      </div>

      {/* Main content */}
      <div className="px-4 py-3 min-w-0">
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {job.title}
          </h3>
          {isNew && (
            <span className="shrink-0 text-[9px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 tracking-widest">
              NEW
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-gray-500">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-violet-50 text-violet-800 font-medium">
            <JobTypeIcon className="w-2.5 h-2.5" />
            {JOB_TYPE_CONFIG[job?.jobType]?.label}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-medium">
            <Tag size={9} />
            {job?.category?.name}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <Building2 className="w-2.5 h-2.5" />
            {employerName}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" />
            {job.location}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {timeAgo(job?.createdAt || "")}
          </span>
        </div>
      </div>

      {/* Salary column */}
      {job.salary && (
        <div className="flex items-center px-4 border-l border-gray-100 text-sm font-semibold text-gray-900 whitespace-nowrap self-stretch">
          ৳{job.salary}
        </div>
      )}

      {/* Arrow CTA column */}
      <div className="flex items-center justify-center px-4 border-l border-gray-100 self-stretch">
        <div className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:bg-violet-50 group-hover:border-violet-200 transition-colors">
          <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-violet-600 transition-colors" />
        </div>
      </div>
    </Link>
  );
}
