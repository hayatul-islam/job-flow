import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createJob,
  deleteJob,
  getJobById,
  getJobs,
  updateJob,
} from "@/lib/api/job";
import { JobsParams } from "@/types";

export const useJobs = (params: JobsParams) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => getJobs(params),
  });
};

export const useJob = (id: number) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobById(id),
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateJob,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({
        queryKey: ["job", variables.id],
      });
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
};
