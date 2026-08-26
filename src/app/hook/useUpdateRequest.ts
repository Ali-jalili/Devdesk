/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRequest } from "@/features/requests/RequestService";

function useUpdateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      data,
    }: {
      requestId: string;
      data: {
        name: string;
        method: string;
        url: string;
        headers: Record<string, string>;
        params: Record<string, string>;
        body: string;
        description: string;
        example_request: string;
        example_response: string;
        notes: string;
      };
    }) => updateRequest(requestId, data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["requests", data.id],
      });
    },
  });
}

export default useUpdateRequest;
