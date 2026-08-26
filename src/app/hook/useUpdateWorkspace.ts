/** @format */

import { updateWorkspace } from "@/features/workspaces/WorkspaceService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      workspaceId,
      data,
    }: {
      workspaceId: string;
      data: {
        name: string;
        description: string;
      };
    }) => updateWorkspace(workspaceId, data.name, data.description),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["workspaceDetails", variables.workspaceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });

  return mutation;
}

export default useUpdateWorkspace;
