/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteVariable } from "@/features/environments/EnvironmentVariableService";

function useDeleteVariable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVariable,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["environment_variables"],
      });
    },
  });
}

export default useDeleteVariable;
