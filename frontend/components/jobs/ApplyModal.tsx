"use client";

import { useJobApply } from "@/hooks/useApplications";
import { useState } from "react";
import { Button } from "../ui/button";

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
      <div className=" bg-white rounded-2xl p-7 w-full max-w-md overflow-hidden border border-gray-200">
        <h4 className="mb-1">Apply for this job</h4>
        <p className=" mb-5">Upload your CV to submit your application</p>

        <label className="block cursor-pointer">
          <div
            className={`border-2 border-dashed rounded-xl px-5 py-7 text-center ${
              cvFile
                ? "border-primary/80 bg-primary/5 text-primary"
                : "border-gray-200 hover:border-primary/60 hover:bg-primary/5 transition-colors"
            }`}
          >
            {cvFile ? (
              <h6 className="!text-primary ">{cvFile.name}</h6>
            ) : (
              <p>Click to upload your CV (PDF)</p>
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

        {applyError && <p className="!text-red-500 mt-3">{applyError}</p>}

        <div className="flex justify-between gap-3 mt-5 w-full">
          <Button variant={"outline"} onClick={onClose} className="w-[48%]">
            Cancel
          </Button>

          <Button
            onClick={handleApply}
            disabled={!cvFile || applyMutation.isPending}
            className="w-[48%]"
          >
            {applyMutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
