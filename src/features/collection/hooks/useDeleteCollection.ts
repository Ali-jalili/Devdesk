/**
 *
 * @format
 */

/** @format */

import { deleteCollection } from "@/features/collection/CollectionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCollection() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables: { workspaceId: string; collectionId: string }) =>
      deleteCollection(variables.collectionId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collections", variables.workspaceId],
      });
    },
  });

  return mutation;
}

export default useDeleteCollection;
