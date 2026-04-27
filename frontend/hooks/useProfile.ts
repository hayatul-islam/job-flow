import { getProfile, updateProfile } from "@/lib/api/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useProfile = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: options?.enabled ?? true,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      toast.success(data?.message);

      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to update profile");
    },
  });
};
