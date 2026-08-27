/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateVariable } from "@/features/environments/EnvironmentVariableService";

function useUpdateVariable() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      variableId,
      data,
    }: {
      variableId: string;
      data: {
        key: string;
        value: string;
      };
    }) => updateVariable(variableId, data),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["environment_variables"],
      });
    },
  });
}

export default useUpdateVariable;
