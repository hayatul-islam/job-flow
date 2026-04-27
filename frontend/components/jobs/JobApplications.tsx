"use client";

import { useJobApplications } from "@/hooks/useApplications";
import { useUpdateApplicationStatus } from "@/lib/api/applications";
import api from "@/lib/axios";
import { ArrowLeft, Download, Users } from "lucide-react";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import EmptyTable from "../shared/EmptyTable";
import Table, { Column } from "../shared/Table";
import AppliedJobsSkeleton from "../skeletons/AppliedJobsSkeleton";
import { Button } from "../ui/button";

interface Application {
  id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  cvUrl: string;
  createdAt: string;
  user: { id: number; firstName: string; lastName: string; email: string };
}

const STATUS_STYLE = {
  PENDING: { bg: "bg-[#FAEEDA]", text: "text-[#854F0B]" },
  ACCEPTED: { bg: "bg-[#EAF3DE]", text: "text-[#3B6D11]" },
  REJECTED: { bg: "bg-[#FCEBEB]", text: "text-[#A32D2D]" },
};

const getColumns = (
  onStatusChange: (id: number, status: string) => void,
  updatingId: number | null,
  onCvDownload: (id: number) => void,
): Column<Application>[] => [
  {
    label: "Applicant",
    width: "28%",
    render: (row) => {
      return (
        <div className="flex items-center gap-3">
          <div
            className={`w-[34px] h-[34px] rounded-full shrink-0 flex items-center justify-center text-xs font-medium bg-primary/10 text-black`}
          >
            {row.user.firstName[0]}
          </div>
          <div>
            <h6 className="text-sm font-medium">
              {row.user.firstName} {row.user.lastName}
            </h6>
            <p className="text-xs text-gray-500 mt-0.5">{row.user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    label: "Applied",
    width: "14%",
    render: (row) => (
      <p className="text-sm text-gray-500">
        {moment(row.createdAt).format("DD MMM YYYY")}
      </p>
    ),
  },
  {
    label: "Status",
    width: "20%",
    render: (row) => {
      const s = STATUS_STYLE[row.status];
      return (
        <select
          value={row.status}
          disabled={updatingId === row.id}
          onChange={(e) => onStatusChange(row.id, e.target.value)}
          className={` text-[11.5px] font-medium px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer appearance-none ${s?.bg} ${s?.text} disabled:opacity-60`}
        >
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
      );
    },
  },
  {
    label: "Action",
    width: "14%",
    align: "right",
    render: (row) => (
      <Button
        onClick={() => onCvDownload(row.id)}
        className="h-8 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
      >
        <Download size={8} />
        Download CV
      </Button>
    ),
  },
];

export default function JobApplications() {
  const { id } = useParams<{ id: string }>();
  const jobId = Number(id);
  const router = useRouter();

  const { data, isLoading } = useJobApplications(jobId);
  const { mutate: updateStatus, variables } = useUpdateApplicationStatus();

  const updatingId = variables?.id ?? null;

  const handleCvDownload = async (id: number) => {
    try {
      const response = await api.get(`/applications/${id}/cv`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `cv-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CV download failed", err);
    }
  };

  return (
    <div className="pt-24 pb-12">
      <div className="w-full container">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to My Posts
        </button>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h4 className="font-medium">Applications</h4>
            <p className="text-xs md:text-[16px] mt-0.5">
              Review and manage applicants for this position
            </p>
          </div>
          {data?.data?.length > 0 && (
            <span className="hidden md:block text-sm text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-full">
              {data.data.length} applicant{data.data.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <Table
          columns={getColumns(
            (id, status) => updateStatus({ id, status }),
            updatingId,
            (id) => handleCvDownload(id),
          )}
          data={data?.data}
          isLoading={isLoading}
          skeleton={<AppliedJobsSkeleton />}
          emptyState={
            <EmptyTable
              icon={Users}
              title="No applications yet"
              description="Applications for this job will appear here"
            />
          }
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}
