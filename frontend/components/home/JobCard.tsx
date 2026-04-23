// components/jobs/JobCardCompact.tsx

import { JOB_TYPE_CONFIG } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import { Job } from "@/types";
import { Clock, MapPin, Tag } from "lucide-react";
import Link from "next/link";
import { Card } from "../ui/card";

interface JobCardCompactProps {
  job: Job;
}

export default function JobCard({ job }: JobCardCompactProps) {
  const employerName = `${job?.employer?.firstName} ${job?.employer?.lastName}`;
  const JobTypeIcon = JOB_TYPE_CONFIG[job?.jobType]?.icon;
  const isNew = timeAgo(job?.createdAt || "") === "Today";
  const employerFirstLetter = employerName?.[0]?.toUpperCase() || "A";

  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="p-0 bg-white group overflow-hidden border-black/8 hover:border-black/25 transition-all duration-150 flex flex-col h-full shadow-sm">
        <div className="px-3.5 pt-3.5 pb-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="w-[34px] h-[34px] rounded-lg bg-black/5 border border-black/5 flex items-center justify-center text-xs font-semibold text-black shrink-0">
              {employerFirstLetter}
            </div>
            {job.salary && (
              <span className="text-xs font-semibold text-black bg-gray-50 border border-black/10 rounded-lg px-2.5 py-1">
                ৳{job.salary}
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] text-black truncate">
                {employerName}
              </span>
              {isNew && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 tracking-wide shrink-0">
                  NEW
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-2.5 h-2.5 text-gray-600 shrink-0" />
              <span className="text-[11px] text-gray-600 truncate">
                {job.location}
              </span>
            </div>
          </div>

          <h6 className="text-sm font-semibold text-black leading-snug line-clamp-2">
            {job.title}
          </h6>
        </div>

        <div className="px-3.5 py-2.5 border-t border-black/5 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/5 text-black">
              <JobTypeIcon className="w-2.5 h-2.5" />
              {JOB_TYPE_CONFIG[job?.jobType]?.label}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/5 text-black">
              <Tag size={9} />
              {job?.category?.name}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-gray-600 shrink-0">
            <Clock className="w-3 h-3" />
            {timeAgo(job?.createdAt || "")}
          </span>
        </div>
      </Card>
    </Link>
  );
}
