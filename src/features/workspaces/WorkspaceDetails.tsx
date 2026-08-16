/** @format */

import useWorkspaceDetails from "@/app/hook/useWorkspaceDetails";
import ErrorMessage from "@/components/ErrorMessage";
import { FiArrowLeft, FiFolderPlus } from "react-icons/fi";
import Loading from "@/ui/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import EditWorkspaceModal from "./EditWorkspaceModal";

function WorkspaceDetails() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { workspaceId } = useParams<{ workspaceId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useWorkspaceDetails(workspaceId);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!workspaceId) return null;

  function openEditModal() {
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
  }

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        {/* Back */}
        <button
          onClick={() => navigate("/app/workspaces")}
          type="button"
          className="group mb-8 inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <FiArrowLeft
            size={16}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Workspaces
        </button>

        {/* Workspace Header */}
        <div className="flex items-start justify-between gap-8">
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-primary" />

              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Workspace
              </span>
            </div>

            <h1 className="truncate text-3xl font-semibold tracking-tight text-foreground">
              {data?.name}
            </h1>

            {data?.description && (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {data.description}
              </p>
            )}
          </div>

          <button
            onClick={openEditModal}
            type="button"
            className="shrink-0 cursor-pointer rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
          >
            Edit
          </button>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-border/70" />

        {/* Overview */}
        <section>
          <div className="mb-5">
            <h2 className="text-sm font-semibold">Overview</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              A quick look at your workspace.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Collections */}
            <div className="border-border/70 sm:border-r sm:pr-8">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Collections
                </span>

                <FiFolderPlus size={18} className="text-muted-foreground" />
              </div>

              <div className="mt-4 text-3xl font-semibold">0</div>

              <p className="mt-1 text-xs text-muted-foreground">
                API collections
              </p>
            </div>

            {/* Requests */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Requests</span>
              </div>

              <div className="mt-4 text-3xl font-semibold">0</div>

              <p className="mt-1 text-xs text-muted-foreground">API requests</p>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Collections</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Organize your API requests into collections.
              </p>
            </div>

            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground opacity-50"
            >
              + New Collection
            </button>
          </div>

          {/* Empty State */}
          <div className="flex min-h-64 flex-col items-center justify-center border-y border-dashed border-border/70 px-6 text-center">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground">
              <FiFolderPlus size={18} />
            </div>

            <h3 className="text-sm font-semibold">No collections yet</h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Create your first collection to start organizing your API
              requests.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 cursor-not-allowed rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground opacity-50"
            >
              Create Collection
            </button>
          </div>
        </section>
      </div>

      {isEditModalOpen && (
        <EditWorkspaceModal
          workspaceId={workspaceId}
          name={data.name}
          description={data.description}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
}

export default WorkspaceDetails;
