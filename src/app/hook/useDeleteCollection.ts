/**
 *
 * @format
 */

/** @format */

import { deleteCollection } from "@/features/collection/CollectionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteCollection() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables: { workspaceId: string; collectionId: string }) =>
      deleteCollection(variables.collectionId),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collections", variables.workspaceId],
      });
      toast.success("Collection deleted successfully");
    },
  });

  return mutation;
}

export default useDeleteCollection;
