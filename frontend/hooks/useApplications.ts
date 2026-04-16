import { applyToJob } from "@/lib/api/applications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
