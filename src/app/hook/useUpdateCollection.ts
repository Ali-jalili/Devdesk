/** @format */

import { updateCollection } from "@/features/collection/CollectionService";
import { useMutation } from "@tanstack/react-query";

function useUpdateCollection() {
  const mutation = useMutation({
    mutationFn: ({
      collectionId,
      data,
    }: {
      collectionId: string;
      data: {
        name: string;
        description: string;
      };
    }) => updateCollection(collectionId, data.name, data.description),
  });

  return mutation;
}

export default useUpdateCollection;
