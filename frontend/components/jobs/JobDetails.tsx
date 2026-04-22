"use client";

import { useJob } from "@/hooks/useJobs";
import { JOB_TYPE_COLOR, JOB_TYPE_LABEL } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import JobDetailsSkeleton from "../skeletons/JobDetailsSkeleton";
import { Button } from "../ui/button";
import ApplyModal from "./ApplyModal";

export default function JobDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const { data, isLoading, isError } = useJob(
    Number(typeof id === "string" ? id : undefined),
  );

  const employerName = `${data?.employer?.firstName} ${data?.employer?.lastName}`;

  const employerFirstLetter = employerName?.[0]?.toUpperCase() || "A";

  if (isLoading) {
    return (
      <div className="pt-20 pb-12">
        <JobDetailsSkeleton />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-3">
            Job not found or failed to load.
          </p>
          <Link href="/" className="text-primary-100 text-sm hover:underline">
            Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 px-4 pb-12 pt-24">
      <div className="container">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
          <div className="bg-white border border-gray-200 rounded-2xl p-7">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-lg bg-primary/5 border border-primary/5 flex items-center justify-center text-xl font-semibold text-primary shrink-0 capitalize">
                {employerFirstLetter}
              </div>
              <div>
                <p className="!font-medium !text-primary">
                  {data?.employer?.firstName} {data?.employer?.lastName}
                </p>
                <h5 className="text-xl !font-medium ">{data?.title}</h5>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${JOB_TYPE_COLOR[data.jobType] ?? "bg-gray-100 text-gray-700"}`}
              >
                <Clock size={11} />
                {JOB_TYPE_LABEL[data.jobType] ?? data.jobType}
              </span>
              {data.jobType === "REMOTE" || data.jobType === "HYBRID" ? null : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-800">
                  <MapPin size={11} />
                  On-site
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800">
                <Tag size={11} />
                {data?.category?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                {
                  icon: <MapPin size={16} className="text-gray-400" />,
                  label: "Location",
                  value: data?.location,
                },
                {
                  icon: <Calendar size={16} className="text-gray-400" />,
                  label: "Posted",
                  value: timeAgo(data?.createdAt || ""),
                },
                {
                  icon: <Clock size={16} className="text-gray-400" />,
                  label: "Job type",
                  value: JOB_TYPE_LABEL[data?.jobType] ?? data?.jobType,
                },
                {
                  icon: <Tag size={16} className="text-gray-400" />,
                  label: "Category",
                  value: data?.category?.name,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3"
                >
                  {item.icon}
                  <div>
                    <p className="!text-xs uppercase">{item.label}</p>
                    <h6 className=" mt-0.5">{item.value}</h6>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-100 mb-6" />

            <div className="mb-6">
              <h5 className=" mb-3">About the role</h5>
              <div
                className="leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:sticky lg:top-6">
            <div className="mb-5">
              <h4 className=" !font-medium ">
                ৳{Number(data.salary).toLocaleString()}
              </h4>
              <p className="mt-1">per month</p>
            </div>

            <hr className="border-gray-100 mb-4" />

            {/* Info rows */}
            <div className="space-y-3 mb-5">
              {[
                { key: "Location", val: data.location },
                {
                  key: "Job type",
                  val: JOB_TYPE_LABEL[data?.jobType] ?? data?.jobType,
                },
                { key: "Category", val: data?.category?.name },
              ].map((row) => (
                <div
                  key={row.key}
                  className="flex items-center justify-between"
                >
                  <p>{row.key}</p>
                  <h6>{row.val}</h6>
                </div>
              ))}
            </div>

            {applied ? (
              <div className="w-full h-11 flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6.5 10l2.5 2.5 4.5-4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Applied successfully
              </div>
            ) : (
              <Button
                onClick={() => setShowApplyModal(true)}
                className="w-full bg-black"
              >
                <ArrowRight size={15} />
                Apply now
              </Button>
            )}

            <hr className="border-gray-100 my-5" />

            <div>
              <p className=" uppercase tracking-wide mb-3">Posted by</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/5 border border-primary/5 flex items-center justify-center text-sm font-semibold text-primary shrink-0 capitalize">
                  {employerFirstLetter}
                </div>
                <div>
                  <h6 className="text-sm font-medium text-black">
                    {employerName}
                  </h6>
                  <p className="!text-xs 0">Employer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showApplyModal && (
        <ApplyModal
          jobId={id as string}
          onClose={() => setShowApplyModal(false)}
          onSuccess={() => setApplied(true)}
        />
      )}
    </div>
  );
}
