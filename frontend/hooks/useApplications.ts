import {
  applyToJob,
  getJobApplicationCv,
  getJobApplications,
  getMyApplications,
} from "@/lib/api/applications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMyApplications = () => {
  return useQuery({
    queryKey: ["my-applications"],
    queryFn: () => getMyApplications(),
  });
};

export const useJobApplications = (id: number) => {
  return useQuery({
    queryKey: ["job-applications"],
    queryFn: () => getJobApplications(id),
  });
};

export const useJobApplicationCv = (id: number | undefined) => {
  return useQuery({
    queryKey: ["jobApplicationCv", id],
    queryFn: () => getJobApplicationCv(id!),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
  });
};

export const useJobApply = (jobId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cvFile: File) =>
      applyToJob({
        jobId: jobId.toString(),
        cvFile,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job", jobId] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};
