"use client";
import { useMyApplications } from "@/hooks/useApplications";
import { Briefcase, Eye } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import AppliedJobsSkeleton from "../skeletons/AppliedJobsSkeleton";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const columns = [
  { label: "Jobs" },
  { label: "Status" },
  { label: "Date Applied" },
  { label: "Action" },
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

        <Card className="p-0 overflow-hidden">
          {isLoading ? (
            <AppliedJobsSkeleton />
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  {columns.map(({ label }, i) => (
                    <th
                      key={label}
                      className={`
                      h-12 px-6 bg-gray-50
                      text-[12px] font-semibold tracking-[0.07em] uppercase
                      text-black/80
                      ${i === columns.length - 1 ? "text-right" : "text-left"}
                      ${i === 0 ? "w-[40%]" : ""}
                      ${i === 1 ? "w-[20%]" : ""}
                      ${i === 2 ? "w-[25%]" : ""}
                      ${i === 3 ? "w-[15%]" : ""}
                    `}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {i < columns.length - 1 && (
                          <span className="inline-block w-[3px] h-[3px] rounded-full bg-gray-300" />
                        )}
                        {label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {data?.data?.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                          <Briefcase size={24} className="text-gray-400" />
                        </div>
                        <div>
                          <h6>No applications yet</h6>
                          <p className="text-xs mt-0.5">
                            Jobs you apply to will appear here
                          </p>
                        </div>
                        <Link href={"/jobs"}>
                          <Button className="h-9 text-xs px-4 bg-black text-white">
                            Browse Jobs
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((job: any) => {
                    return (
                      <tr
                        key={job.id}
                        className="hover:bg-gray-50/70 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-[38px] h-[38px] rounded-[10px] shrink-0 flex items-center justify-center text-[14px] font-medium border border-gray-200 bg-primary/10`}
                            >
                              {job?.job?.employer?.firstName[0]}
                            </div>
                            <div>
                              <h6>{job?.job?.title}</h6>
                              <p className="text-xs mt-0.5">
                                {job?.job?.location}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-[5px] px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide ${
                              job.status === "PENDING"
                                ? "bg-[#FAEEDA] text-[#854F0B]"
                                : job.status === "ACCEPTED"
                                  ? "bg-[#EAF3DE] text-[#3B6D11]"
                                  : "bg-[#FCEBEB] text-[#A32D2D]"
                            }`}
                          >
                            <span
                              className="w-[5px] h-[5px] rounded-full shrink-0"
                              style={{
                                backgroundColor:
                                  job.status === "PENDING"
                                    ? "#BA7517"
                                    : job.status === "ACCEPTED"
                                      ? "#639922"
                                      : "#E24B4A",
                              }}
                            />
                            {job.status === "PENDING"
                              ? "Pending"
                              : job.status === "ACCEPTED"
                                ? "Accepted"
                                : "Rejected"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-[13px] text-gray-600">
                          {moment(job.createdAt).format("DD MMM YYYY")}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-end items-center">
                            <Link
                              href={`/jobs/${job?.job?.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                            >
                              <Eye size={12} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}
