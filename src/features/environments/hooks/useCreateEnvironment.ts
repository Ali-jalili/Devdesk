/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEnvironment } from "@/features/environments/EnvironmentService";

function useCreateEnvironment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEnvironment,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["environments"],
      });
    },
  });
}

export default useCreateEnvironment;
