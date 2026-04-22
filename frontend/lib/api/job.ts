import { Job, JobsParams } from "@/types";
import api from "../axios";

export const getJobs = async (params: JobsParams) => {
  const formattedParams = {
    ...params,
    jobType: params.jobType.join(","),
    location: params.location.join(","),
  };

  const res = await api.get("/jobs", {
    params: formattedParams,
  });

  return res.data;
};

export const getMyJobs = async () => {
  const res = await api.get("/jobs/my-jobs");

  return res.data;
};

export const createJob = async (data: Job) => {
  const res = await api.post("/jobs", data);
  return res.data;
};

export const getJobById = async (id: number) => {
  const res = await api.get(`/jobs/${id}`);
  return res.data.data as Job;
};

export const updateJob = async ({ id, data }: { id: number; data: Job }) => {
  const res = await api.put(`/jobs/${id}`, data);
  return res.data;
};

export const deleteJob = async (id: number) => {
  const res = await api.delete(`/jobs/${id}`);
  return res.data;
};
