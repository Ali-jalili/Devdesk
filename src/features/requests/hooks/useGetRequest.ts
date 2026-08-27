/** @format */

import { getRequestById } from "@/features/requests/RequestService";
import { useQuery } from "@tanstack/react-query";

function useGetRequest(requestId?: string) {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getRequestById(requestId!),
    queryKey: ["requests", requestId],
    enabled: !!requestId,
  });

  return { data, isLoading, error };
}

export default useGetRequest;
