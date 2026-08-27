/** @format */

import { useQuery } from "@tanstack/react-query";

import { getEnvironments } from "@/features/environments/EnvironmentService";

function useGetEnvironments(workspaceId?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["environments", workspaceId],

    queryFn: () => getEnvironments(workspaceId!),

    enabled: !!workspaceId,
  });

  return {
    data,
    isLoading,
    error,
  };
}

export default useGetEnvironments;
