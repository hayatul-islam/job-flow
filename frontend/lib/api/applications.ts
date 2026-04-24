import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../axios";

export const getMyApplications = async () => {
  const res = await api.get("/applications/my");
  return res.data;
};

export const applyToJob = async ({
  jobId,
  cvFile,
}: {
  jobId: string;
  cvFile: File;
}) => {
  if (!cvFile) throw new Error("Please upload your CV");

  const formData = new FormData();
  formData.append("cv", cvFile);

  const res = await api.post(`/applications/${jobId}`, formData);
  return res.data;
};

export const getJobApplications = async (id: number) => {
  const res = await api.get(`/applications/job/${id}`);
  return res.data;
};

export const getJobApplicationCv = async (id: number) => {
  const res = await api.get(`/applications/${id}/cv`);
  return res.data;
};

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const res = await api.put(`/applications/${id}/status`, { status });
      toast.success(res?.data?.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update status");
    },
  });
};
