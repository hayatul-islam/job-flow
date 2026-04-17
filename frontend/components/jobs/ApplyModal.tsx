"use client";

import { useJobApply } from "@/hooks/useApplications";
import { useState } from "react";

export default function ApplyModal({
  jobId,
  onClose,
  onSuccess,
}: {
  jobId: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [applyError, setApplyError] = useState("");

  const applyMutation = useJobApply(jobId);

  const handleApply = () => {
    if (!cvFile) {
      setApplyError("Please upload your CV");
      return;
    }

    applyMutation.mutate(cvFile, {
      onSuccess: () => {
        setCvFile(null);
        setApplyError("");
        onSuccess();
        onClose();
      },
      onError: (error: any) => {
        setApplyError(
          error.response?.data?.message ||
            error.message ||
            "Application failed",
        );
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl p-7 w-full max-w-md border border-gray-200">
        <h2 className="text-lg font-medium text-black mb-1">
          Apply for this job
        </h2>
        <p className="text-sm text-gray-400 mb-5">
          Upload your CV to submit your application
        </p>

        {/* Upload */}
        <label className="block cursor-pointer">
          <div
            className={`border-2 border-dashed rounded-xl px-5 py-7 text-center ${
              cvFile
                ? "border-blue-300 bg-blue-50"
                : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/40"
            }`}
          >
            {cvFile ? (
              <p className="text-sm text-primary font-medium">{cvFile.name}</p>
            ) : (
              <p className="text-sm text-gray-500">
                Click to upload your CV (PDF)
              </p>
            )}
          </div>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              setCvFile(e.target.files?.[0] ?? null);
              setApplyError("");
            }}
          />
        </label>

        {/* Error */}
        {applyError && (
          <p className="text-red-500 text-sm mt-3">{applyError}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-gray-200 rounded-xl text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleApply}
            disabled={!cvFile || applyMutation.isPending}
            className="flex-1 h-11 bg-primary-100 text-white rounded-xl text-sm disabled:opacity-50"
          >
            {applyMutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
