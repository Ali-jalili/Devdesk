/** @format */

import { Outlet, useParams } from "react-router-dom";
import { useState } from "react";

import WorkspaceNavigation from "./WorkspaceNavigation";
import useWorkspaceDetails from "@/app/hook/useWorkspaceDetails";
import Loading from "@/ui/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import EditWorkspaceModal from "./EditWorkspaceModal";

export default function WorkspaceLayout() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading, error } = useWorkspaceDetails(workspaceId);

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage message={error.message} />;

  if (!data || !workspaceId) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Workspace Header */}

      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />

            <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Workspace
            </span>
          </div>

          <h1 className="truncate text-3xl font-semibold tracking-tight">
            {data.name}
          </h1>

          {data.description && (
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              {data.description}
            </p>
          )}
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          type="button"
          className="shrink-0 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          Edit
        </button>
      </div>

      {/* Workspace Navigation */}

      <div className="mt-8">
        <WorkspaceNavigation />
      </div>

      {/* Current Workspace Page */}

      <div className="mt-8">
        <Outlet />
      </div>

      {isEditModalOpen && (
        <EditWorkspaceModal
          workspaceId={workspaceId}
          name={data.name}
          description={data.description}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}
