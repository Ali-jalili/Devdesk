/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEnvironment } from "@/features/environments/EnvironmentService";

function useDeleteEnvironment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEnvironment,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["environments"],
      });
    },
  });
}

export default useDeleteEnvironment;
