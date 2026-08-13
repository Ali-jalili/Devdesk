/** @format */

import useWorkspaceDetails from "@/app/hook/useWorkspaceDetails";
import React from "react";
import { useParams } from "react-router-dom";

function WorkspaceDetails() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const { data, isLoading, error } = useWorkspaceDetails(workspaceId);

  if (!workspaceId) return null;

  return <div>{data?.name}</div>;
}

export default WorkspaceDetails;
