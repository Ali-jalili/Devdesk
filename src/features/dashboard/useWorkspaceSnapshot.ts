/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "@/app/context/useAuth";
import { getWorkspaceSnapshot } from "./DashboardService";

export default function useWorkspaceSnapshot() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspace-snapshot", user?.id],

    queryFn: () => getWorkspaceSnapshot(user!.id),

    enabled: !!user,
  });

  return {
    data,
    isLoading,
    error,
  };
}
