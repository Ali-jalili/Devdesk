/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createRequest } from "@/features/requests/RequestService";

function useCreateRequest() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },
  });

  return mutation;
}

export default useCreateRequest;
