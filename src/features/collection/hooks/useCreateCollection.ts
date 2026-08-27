/** @format */

import { createCollection } from "@/features/collection/CollectionService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
type CreateCollectionInput = {
  workspaceId: string;
  name: string;
  description: string;
};
function useCreateCollection() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ workspaceId, name, description }: CreateCollectionInput) =>
      createCollection({ workspaceId, name, description }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collections", variables.workspaceId],
      });
    },
  });

  return mutation;
}

export default useCreateCollection;
