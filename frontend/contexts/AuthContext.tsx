"use client";
import { useProfile } from "@/hooks/useProfile";
import api from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  setAuthenticated: (val: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
  setAuthenticated: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setAuthenticated] = useState(
    () => !!Cookies.get("accessToken"),
  );

  const { data, isLoading } = useProfile({
    enabled: isAuthenticated,
  });

  const user = data?.data || null;
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      const res = await api.post("/auth/logout", { refreshToken });
      toast.success(res?.data?.message);
    } catch {
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      queryClient.clear();
      setAuthenticated(false);

      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isAuthenticated && isLoading,
        logout,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
