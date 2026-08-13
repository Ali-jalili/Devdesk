/** @format */

import React from "react";
import { useParams } from "react-router-dom";

function WorkspaceDetails() {
  const { workspaceId } = useParams();

  return <div>WorkspaceDetails</div>;
}

export default WorkspaceDetails;
