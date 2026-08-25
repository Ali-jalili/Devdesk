/** @format */

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useGetRequest from "@/app/hook/useGetRequest";
import Loading from "@/ui/Loading";

import RequestView from "./RequestView";
import RequestEditForm from "./RequestEditForm";

export default function RequestDetail() {
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  const { workspaceId, collectionId, requestId } = useParams();
  const { data, isLoading } = useGetRequest(requestId);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <div>Request not found</div>;
  }

  return isEditing ? (
    <RequestEditForm
      data={data}
      onSuccess={() => setIsEditing(false)}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <RequestView
      data={data}
      onEdit={() => setIsEditing(true)}
      onDeleteSuccess={() => {
        navigate(`/app/workspaces/${workspaceId}/collections/${collectionId}`);
      }}
    />
  );
}
