/** @format */

import { getCollectionById } from "@/features/collection/CollectionService";
import { useQuery } from "@tanstack/react-query";

function useGetCollection(collectionId?: string) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getCollectionById(collectionId!),
    queryKey: ["collections", collectionId],
    enabled: !!collectionId,
  });

  return { data, isLoading, error };
}

export default useGetCollection;
