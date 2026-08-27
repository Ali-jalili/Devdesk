/** @format */

import { useQuery } from "@tanstack/react-query";
import useAuth from "@/app/context/useAuth";
import { getWorkspaces } from "@/features/workspaces/WorkspaceService";

export default function useWorkspaces() {
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["workspaces", user?.id],

    queryFn: getWorkspaces,

    enabled: !!user,
  });

  return {
    data,
    isLoading,
    error,
  };
}
