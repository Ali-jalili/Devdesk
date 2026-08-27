/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteRequest } from "@/features/requests/RequestService";

function useDeleteRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },
  });
}

export default useDeleteRequest;
