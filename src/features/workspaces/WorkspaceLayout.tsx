/** @format */
/** @format */

import { Outlet, useParams } from "react-router-dom";
import WorkspaceNavigation from "./WorkspaceNavigation";
import useWorkspaceDetails from "@/app/hook/useWorkspaceDetails";

export default function WorkspaceLayout() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const { data, isLoading } = useWorkspaceDetails(workspaceId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        {/* Workspace Context */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>

          <h1 className="mt-2 text-2xl font-semibold">{data?.name}</h1>

          {data?.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {data.description}
            </p>
          )}
        </div>

        {/* Workspace Navigation */}
        <WorkspaceNavigation />

        {/* Child Pages */}
        <div className="pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
