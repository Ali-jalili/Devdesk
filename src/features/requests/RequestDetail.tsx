/** @format */

import useGetRequest from "@/app/hook/useGetRequest";
import Loading from "@/ui/Loading";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RequestView from "./RequestView";
import RequestEditForm from "./RequestEditForm";

export default function RequestDetail() {
  const { requestId } = useParams();

  const { data, isLoading } = useGetRequest(requestId);
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <div>Request not found</div>;
  }

  return isEditing ? (
    <RequestEditForm data={data} />
  ) : (
    <RequestView data={data} onEdit={() => setIsEditing(true)} />
  );
}
