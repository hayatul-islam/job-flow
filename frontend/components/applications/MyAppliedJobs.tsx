"use client";

import { useMyApplications } from "@/hooks/useApplications";
import { Eye, Trash2 } from "lucide-react";
import moment from "moment";
import AppliedJobsSkeleton from "../skeletons/AppliedJobsSkeleton";
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
    <div className="bg-light-background pt-24 pb-12">
      <div className="w-full container">
        <div className="mb-6">
          <h4 className="font-medium">My Applications</h4>
          <p className="text-[16px] mt-0.5">
            Track and manage all your job applications in one place
          </p>
        </div>

        {/* Table */}
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
                {data?.data?.map((job) => {
                  console.log(job);
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

                      {/* Status */}
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

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end items-center gap-1">
                          <button className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#E6F1FB] hover:text-[#185FA5] transition-colors">
                            <Eye size={15} />
                          </button>
                          <button className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-gray-600 hover:bg-[#FCEBEB] hover:text-[#A32D2D] transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </div>
  );
}
