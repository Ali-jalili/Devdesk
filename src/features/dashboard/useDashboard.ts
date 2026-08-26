/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "@/app/context/useAuth";
import getDashboardStats from "./DashboardService";

export default function useDashboard() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard", user?.id],

    queryFn: () => getDashboardStats(user!.id),

    enabled: !!user,
  });

  return {
    data,
    isLoading,
    error,
  };
}
