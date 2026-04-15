"use client";

import { Badge } from "@/components/ui/badge";
import {
  cn,
  formatSalary,
  getInitials,
  getLogoColor,
  timeAgo,
} from "@/lib/utils";
import { Job } from "@/types";
import { ClockIcon, HeartIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface JobCardProps {
  job: Job;
}

const WORK_MODE_STYLES: Record<string, string> = {
  Remote: "bg-emerald-50 text-emerald-700 border-emerald-100",
  Onsite: "bg-blue-50 text-blue-700 border-blue-100",
  Hybrid: "bg-violet-50 text-violet-700 border-violet-100",
};

const JOB_TYPE_STYLES: Record<string, string> = {
  "Full-time": "bg-orange-50 text-orange-700 border-orange-100",
  "Part-time": "bg-teal-50 text-teal-700 border-teal-100",
  Contract: "bg-rose-50 text-rose-700 border-rose-100",
  Internship: "bg-sky-50 text-sky-700 border-sky-100",
};

export default function JobCard({ job }: JobCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-gray-200 flex flex-col">
      {/* Featured badge */}
      {job.featured && (
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Top row */}
      <div className="flex items-start gap-3 mb-4">
        {/* Company logo */}
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 font-serif",
            getLogoColor(job.companyName),
          )}
        >
          {getInitials(job.companyName)}
        </div>

        {/* Title + company */}
        <div className="flex-1 min-w-0 pr-6">
          <Link href={`/jobs/${job.id}`}>
            <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-primary transition-colors leading-snug">
              {job.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-400 font-light mt-0.5">
            {job.companyName}
          </p>
        </div>

        {/* Save button */}
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-4 right-4 mt-5"
          aria-label={saved ? "Unsave job" : "Save job"}
        >
          <HeartIcon
            className={cn(
              "w-4 h-4 transition-colors",
              saved
                ? "fill-primary text-primary"
                : "text-gray-300 hover:text-primary",
            )}
          />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full border",
            WORK_MODE_STYLES[job.workMode],
          )}
        >
          {job.workMode}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full border",
            JOB_TYPE_STYLES[job.jobType],
          )}
        >
          {job.jobType}
        </Badge>
        {job.tags.slice(0, 2).map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-50 text-gray-500 border-gray-100"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900">
            {formatSalary(job.salaryMin, job.salaryMax)}
            <span className="text-xs font-normal text-gray-400"> /mo</span>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPinIcon className="w-3 h-3 text-gray-300" />
            <span className="text-xs text-gray-400 font-light">
              {job.location}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-300">
          <ClockIcon className="w-3 h-3" />
          <span className="text-xs">{timeAgo(job.postedAt)}</span>
        </div>
      </div>
    </div>
  );
}
