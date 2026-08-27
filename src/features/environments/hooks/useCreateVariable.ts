/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createVariable } from "@/features/environments/EnvironmentVariableService";

function useCreateVariable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVariable,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["environment_variables"],
      });
    },
  });
}

export default useCreateVariable;
