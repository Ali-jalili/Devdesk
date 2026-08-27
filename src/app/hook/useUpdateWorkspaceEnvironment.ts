/** @format */

import { updateWorkspaceEnvironment } from "@/features/workspaces/WorkspaceService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateWorkspaceEnvironment() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      workspaceId,
      environmentId,
    }: {
      workspaceId: string;
      environmentId: string | null;
    }) => updateWorkspaceEnvironment(workspaceId, environmentId),

    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["workspace", data.id],
      });
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}
