"use client";
import { useMyApplications } from "@/hooks/useApplications";
import { Briefcase, Eye } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import EmptyTable from "../shared/EmptyTable";
import Table, { Column } from "../shared/Table";
import AppliedJobsSkeleton from "../skeletons/AppliedJobsSkeleton";

interface Application {
  id: number;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  job: {
    id: number;
    title: string;
    location: string;
    employer: { firstName: string };
  };
}

const STATUS_STYLE = {
  PENDING: {
    bg: "bg-[#FAEEDA]",
    text: "text-[#854F0B]",
    dot: "#BA7517",
    label: "Pending",
  },
  ACCEPTED: {
    bg: "bg-[#EAF3DE]",
    text: "text-[#3B6D11]",
    dot: "#639922",
    label: "Accepted",
  },
  REJECTED: {
    bg: "bg-[#FCEBEB]",
    text: "text-[#A32D2D]",
    dot: "#E24B4A",
    label: "Rejected",
  },
};

const columns: Column<Application>[] = [
  {
    label: "Jobs",
    width: "40%",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-[38px] h-[38px] rounded-[10px] shrink-0 flex items-center justify-center text-[14px] font-medium border border-gray-200 bg-primary/10">
          {row.job?.employer?.firstName[0]}
        </div>
        <div>
          <h6>{row.job.title}</h6>
          <p className="text-xs mt-0.5">{row.job.location}</p>
        </div>
      </div>
    ),
  },
  {
    label: "Status",
    width: "20%",
    render: (row) => {
      const s = STATUS_STYLE[row.status];
      return (
        <span
          className={`inline-flex items-center gap-[5px] px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide ${s.bg} ${s.text}`}
        >
          <span
            className="w-[5px] h-[5px] rounded-full shrink-0"
            style={{ backgroundColor: s.dot }}
          />
          {s.label}
        </span>
      );
    },
  },
  {
    label: "Date Applied",
    width: "25%",
    render: (row) => (
      <span className="text-[13px] text-gray-600">
        {moment(row.createdAt).format("DD MMM YYYY")}
      </span>
    ),
  },
  {
    label: "Action",
    width: "15%",
    align: "right",
    render: (row) => (
      <div className="flex justify-end">
        <Link
          href={`/jobs/${row.job.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
        >
          <Eye size={12} />
        </Link>
      </div>
    ),
  },
];

export default function MyAppliedJobs() {
  const { data, isLoading } = useMyApplications();

  return (
    <div className="bg-gradient-to-br from-gray-50 via-emerald-50/40 to-teal-50/30 pt-24 pb-12">
      <div className="w-full container">
        <div className="mb-6">
          <h4 className="font-medium">My Applications</h4>
          <p className="text-[16px] mt-0.5">
            Track and manage all your job applications in one place
          </p>
        </div>

        <Table
          columns={columns}
          data={data?.data}
          isLoading={isLoading}
          skeleton={<AppliedJobsSkeleton />}
          emptyState={
            <EmptyTable
              icon={Briefcase}
              title="No applications yet"
              description="Jobs you apply to will appear here"
              actionLabel="Browse Jobs"
              actionHref="/jobs"
            />
          }
          rowKey={(row) => row.id}
        />
      </div>
    </div>
  );
}
