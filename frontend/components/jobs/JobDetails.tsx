"use client";

import { useJob } from "@/hooks/useJobs";
import { JOB_TYPE_COLOR, JOB_TYPE_LABEL } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-400">
          <svg
            className="animate-spin"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              strokeOpacity="0.3"
            />
            <path
              d="M12 2a10 10 0 0110 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm">Loading job details...</span>
        </div>
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
    <div className=" bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
          {/* ── Left: Main Card ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-7">
            {/* Company + Title */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                <Briefcase size={24} className="text-primary-100" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">
                  {data?.employer?.firstName} {data?.employer?.lastName}
                </p>
                <h1 className="text-xl font-medium text-black">
                  {data?.title}
                </h1>
              </div>
            </div>

            {/* Badges */}
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

            {/* Meta grid */}
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
                  value: timeAgo(data.createdAt),
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
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-black mt-0.5">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-100 mb-6" />

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-base font-medium text-black mb-3">
                About the role
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                {data.description}
              </p>
            </div>
          </div>

          {/* ── Right: Sticky Card ── */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:sticky lg:top-6">
            {/* Salary */}
            <div className="mb-5">
              <p className="text-2xl font-medium text-black">
                ৳{Number(data.salary).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 mt-1">per month</p>
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
                  <span className="text-xs text-gray-400">{row.key}</span>
                  <span className="text-sm font-medium text-gray-800">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>

            {/* Apply button */}
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
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full h-11 bg-primary-100 hover:bg-primary text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <ArrowRight size={15} />
                Apply now
              </button>
            )}

            {/* Save button */}
            <button
              onClick={() => setSaved((s) => !s)}
              className={`w-full h-10 mt-2.5 text-sm font-medium rounded-xl flex items-center justify-center gap-2 border transition-colors ${
                saved
                  ? "bg-blue-50 border-blue-200 text-primary"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save job"}
            </button>

            <hr className="border-gray-100 my-5" />

            {/* Company mini */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                Posted by
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={16} className="text-primary-100" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black">
                    {data?.employer?.firstName} {data?.employer?.lastName}
                  </p>
                  <p className="text-xs text-gray-400">Employer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Apply Modal ── */}
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
