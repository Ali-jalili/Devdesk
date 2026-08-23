/** @format */

import useGetCollections from "@/app/hook/useGetCollections";
import useWorkspaceDetails from "@/app/hook/useWorkspaceDetails";
import ErrorMessage from "@/components/ErrorMessage";
import Loading from "@/ui/Loading";
import { FiFolderPlus } from "react-icons/fi";
import { useState } from "react";
import { useParams } from "react-router-dom";

import CollectionList from "../collection/CollectionList";
import CreateCollectionModal from "../collection/CreateCollectionModal";
import DeleteWorkspaceAlert from "./DeleteWorkspaceAlert";

function WorkspaceDetails() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] =
    useState(false);

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { isLoading, error } = useWorkspaceDetails(workspaceId);

  const { data: collections } = useGetCollections(workspaceId);

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage message={error.message} />;

  if (!workspaceId) return null;

  function openCreateCollectionModal() {
    setIsCreateCollectionModalOpen(true);
  }

  function closeCreateCollectionModal() {
    setIsCreateCollectionModalOpen(false);
  }

  return (
    <div>
      {/* Overview */}
      <section>
        <div className="mb-5">
          <h2 className="text-sm font-semibold">Overview</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            A quick look at your workspace.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {/* Collections Stats */}
          <div className="border-border/70 sm:border-r sm:pr-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Collections</span>

              <FiFolderPlus size={18} className="text-muted-foreground" />
            </div>

            <div className="mt-4 text-3xl font-semibold">
              {collections?.length ?? 0}
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              API collections
            </p>
          </div>

          {/* Requests Stats */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Requests</span>
            </div>

            <div className="mt-4 text-3xl font-semibold">0</div>

            <p className="mt-1 text-xs text-muted-foreground">API requests</p>
          </div>
        </div>
      </section>

      {/* Collections Preview */}
      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Collections</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Organize your API requests into collections.
            </p>
          </div>

          <button
            onClick={openCreateCollectionModal}
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            + New Collection
          </button>
        </div>

        {collections?.length === 0 ? (
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
              onClick={openCreateCollectionModal}
              type="button"
              className="mt-5 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              Create Collection
            </button>
          </div>
        ) : (
          <CollectionList collections={collections ?? []} />
        )}
      </section>

      {/* Danger Zone */}
      <section className="mt-12 rounded-2xl border border-red-200 bg-red-50/40 p-6">
        <h2 className="text-sm font-semibold text-red-700">Danger Zone</h2>

        <p className="mt-2 text-sm leading-6 text-red-600/80">
          Delete this workspace permanently. This action cannot be undone.
        </p>

        <button
          onClick={() => setIsDeleteAlertOpen(true)}
          type="button"
          className="mt-5 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          Delete Workspace
        </button>
      </section>

      {isCreateCollectionModalOpen && (
        <CreateCollectionModal
          workspaceId={workspaceId}
          onClose={closeCreateCollectionModal}
        />
      )}

      <DeleteWorkspaceAlert
        workspaceId={workspaceId}
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
      />
    </div>
  );
}

export default WorkspaceDetails;
