/** @format */

import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "./WorkspaceService";

function useGetWorkspaces() {
  const { data, isLoading, error } = useQuery({
    queryFn: getWorkspaces,
    queryKey: ["WorkSpace"],
  });

  return { data, isLoading, error };
}

export default useGetWorkspaces;
