/** @format */

import { updateCollection } from "@/features/collection/CollectionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateCollection() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      collectionId,
      data,
    }: {
      workspaceId: string;
      collectionId: string;
      data: {
        name: string;
        description: string;
      };
    }) => updateCollection(collectionId, data.name, data.description),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collections", variables.workspaceId],
      });
    },
  });

  return mutation;
}

export default useUpdateCollection;
