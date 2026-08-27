/** @format */

import { getCollections } from "@/features/collection/CollectionService";
import { useQuery } from "@tanstack/react-query";

function useGetCollections(workspaceId?: string) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getCollections(workspaceId!),
    queryKey: ["collections", workspaceId],
    enabled: !!workspaceId,
  });

  return { data, isLoading, error };
}

export default useGetCollections;
