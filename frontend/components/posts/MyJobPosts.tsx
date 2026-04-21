"use client";

import { useDeleteJob, useMyJobs } from "@/hooks/useJobs";
import { formatJobType } from "@/lib/utils";
import { Briefcase, Eye, Trash2, Users } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import DeleteModal from "../shared/DeleteModal";
import EmptyTable from "../shared/EmptyTable";
import Table, { Column } from "../shared/Table";
import AppliedJobsSkeleton from "../skeletons/AppliedJobsSkeleton";

interface JobPost {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  jobType: string;
  categoryId: number;
  employerId: number;
  createdAt: string;
  category: { id: number; name: string };
  _count: { applications: number };
}

const JOB_TYPE_STYLE: Record<string, { bg: string; text: string }> = {
  FULL_TIME: { bg: "bg-[#EAF3DE]", text: "text-[#3B6D11]" },
  PART_TIME: { bg: "bg-[#FAEEDA]", text: "text-[#854F0B]" },
  CONTRACT: { bg: "bg-[#E6F1FB]", text: "text-[#185FA5]" },
  INTERNSHIP: { bg: "bg-[#EEEDFE]", text: "text-[#534AB7]" },
  REMOTE: { bg: "bg-[#FCEBEB]", text: "text-[#A32D2D]" },
};

const getColumns = (onDelete: (id: number) => void): Column<JobPost>[] => [
  {
    label: "Job",
    width: "25%",
    render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-[38px] h-[38px] rounded-[10px] shrink-0 flex items-center justify-center text-[14px] font-medium border border-gray-200 bg-primary/10">
          {row.title[0]}
        </div>
        <div>
          <h6>{row.title}</h6>
          <p className="text-xs mt-0.5">{row.location}</p>
        </div>
      </div>
    ),
  },

  {
    label: "Category",
    width: "15%",
    render: (row) => <p>{row.category.name}</p>,
  },
  {
    label: "Salary",
    width: "10%",
    render: (row) => <p>৳{row.salary}</p>,
  },
  {
    label: "Type",
    width: "15%",
    render: (row) => {
      const s = JOB_TYPE_STYLE[row.jobType] ?? {
        bg: "bg-gray-100",
        text: "text-gray-600",
      };
      return (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide ${s.bg} ${s.text}`}
        >
          {formatJobType(row.jobType)}
        </span>
      );
    },
  },
  {
    label: "Applications",
    width: "10%",
    render: (row) => (
      <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
        <Users size={13} className="text-gray-400" />
        {row._count.applications}
      </div>
    ),
  },
  {
    label: "Posted",
    width: "10%",
    render: (row) => <p>{moment(row.createdAt).format("DD MMM YYYY")}</p>,
  },
  {
    label: "Action",
    width: "10%",
    align: "right",
    render: (row) => (
      <div className="flex justify-end items-center gap-1.5">
        <Link
          href={`/jobs/${row.id}/applications`}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
        >
          <Eye size={12} />
        </Link>
        <button
          onClick={() => onDelete(row.id)}
          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-rose-500 bg-rose-50 hover:bg-rose-100 transition-colors"
        >
          <Trash2 size={12} />
        </button>
      </div>
    ),
  },
];

export default function MyJobPosts() {
  const { data, isLoading } = useMyJobs();

  const { mutate: deleteJob, isPending: isDeleting } = useDeleteJob();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = () => {
    if (!deleteId) return;
    deleteJob(deleteId, {
      onSuccess: () => setDeleteId(null),
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-emerald-50/40 to-teal-50/30 pt-24 pb-12">
      <div className="w-full container">
        <div className="mb-6">
          <h4 className="font-medium">My Job Posts</h4>
          <p className="text-[16px] mt-0.5">
            Manage all your job postings in one place
          </p>
        </div>

        <Table
          columns={getColumns((id) => setDeleteId(id))}
          data={data?.data}
          isLoading={isLoading}
          skeleton={<AppliedJobsSkeleton />}
          emptyState={
            <EmptyTable
              icon={Briefcase}
              title="No job posts yet"
              description="Jobs you post will appear here"
              actionLabel="Post a Job"
              actionHref="/jobs-create"
            />
          }
          rowKey={(row) => row.id}
        />
      </div>

      <DeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete this job post?"
        description="This will permanently delete the job post and all its applications."
      />
    </div>
  );
}
