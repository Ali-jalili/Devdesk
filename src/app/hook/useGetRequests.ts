/** @format */
/** @format */

import { getRequests } from "@/features/requests/RequestService";
import { useQuery } from "@tanstack/react-query";

function useGetRequests(collectionId: string) {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getRequests(collectionId),
    queryKey: ["requests", collectionId],
  });

  return { data, error, isLoading };
}

export default useGetRequests;
