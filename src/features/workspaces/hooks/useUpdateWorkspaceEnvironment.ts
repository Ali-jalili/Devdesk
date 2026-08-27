/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateWorkspaceEnvironment } from "@/features/workspaces/WorkspaceService";

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
        queryKey: ["workspaceDetails", data.id],
      });
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
}
