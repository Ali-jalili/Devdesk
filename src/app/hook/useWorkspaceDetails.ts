/** @format */

import { getWorkspaceById } from "@/features/workspaces/WorkspaceService";
import { useQuery } from "@tanstack/react-query";

function useWorkspaceDetails(workspaceId: string) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getWorkspaceById(workspaceId),
    queryKey: ["WorkSpaceDetails", workspaceId],
  });

  return { data, isLoading, error };
}

export default useWorkspaceDetails;
