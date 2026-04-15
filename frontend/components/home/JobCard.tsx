"use client";

import { Badge } from "@/components/ui/badge";
import { cn, timeAgo } from "@/lib/utils";
import { Job } from "@/types";
import { ClockIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-gray-200 flex flex-col">
      {/* Top row */}
      <div className="flex items-start gap-3 mb-4">
        {/* Company logo */}
        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 font-serif bg-blue-50 text-blue-700 border-blue-100",
          )}
        >
          A
        </div>

        {/* Title + company */}
        <div className="flex-1 min-w-0 pr-6">
          <Link href={`/jobs/${job.id}`}>
            <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-primary transition-colors leading-snug">
              {job.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-400 font-light mt-0.5">Abc Company</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <Badge
          variant="outline"
          className={cn(
            "text-[10px] font-medium px-2 py-0.5 rounded-full border bg-orange-50 text-orange-700 border-orange-100",
          )}
        >
          {job.jobType}
        </Badge>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900">
            {job.salary}
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
          <span className="text-xs">{timeAgo(job.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
