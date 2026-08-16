/** @format */

import { updateWorkspace } from "@/features/workspaces/WorkspaceService";
import { useMutation } from "@tanstack/react-query";

function useUpdateWorkspace() {
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
  });

  return mutation;
}

export default useUpdateWorkspace;
