/** @format */

import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiFolderPlus } from "react-icons/fi";

import useGetCollections from "@/app/hook/useGetCollections";
import CollectionList from "./CollectionList";
import CreateCollectionModal from "./CreateCollectionModal";

function Collections() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: collections } = useGetCollections(workspaceId);

  if (!workspaceId) return null;

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }

  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }

  return (
    <div>
      {/* Header */}

      <section className="flex items-start justify-between gap-5">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Collections
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Organize your API requests into collections.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          type="button"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          + New Collection
        </button>
      </section>

      {/* Content */}

      <section className="mt-8">
        {collections?.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center border-y border-dashed border-border px-6 text-center">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground">
              <FiFolderPlus size={18} />
            </div>

            <h2 className="text-sm font-semibold">No collections yet</h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Create your first collection to start organizing your API
              requests.
            </p>

            <button
              onClick={openCreateModal}
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

      {isCreateModalOpen && (
        <CreateCollectionModal
          workspaceId={workspaceId}
          onClose={closeCreateModal}
        />
      )}
    </div>
  );
}

export default Collections;
