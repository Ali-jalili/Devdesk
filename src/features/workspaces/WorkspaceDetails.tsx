/** @format */

import useWorkspaceDetails from "@/app/hook/useWorkspaceDetails";
import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/ui/Loading";
import { useParams } from "react-router-dom";

function WorkspaceDetails() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const { data, isLoading, error } = useWorkspaceDetails(workspaceId);
  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!workspaceId) return null;

  return <div>{data?.name}</div>;
}

export default WorkspaceDetails;
