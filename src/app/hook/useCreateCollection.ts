/** @format */

import { createCollection } from "@/features/collection/CollectionService";
import { useMutation } from "@tanstack/react-query";
type CreateCollectionInput = {
  workspaceId: string;
  name: string;
  description: string;
};
function useCreateCollection() {
  const mutation = useMutation({
    mutationFn: ({ workspaceId, name, description }: CreateCollectionInput) =>
      createCollection({ workspaceId, name, description }),
  });

  return mutation;
}

export default useCreateCollection;
