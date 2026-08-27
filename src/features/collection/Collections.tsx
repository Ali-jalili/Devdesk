/** @format */

import { useState } from "react";

import { useParams } from "react-router-dom";

import { FiFolderPlus, FiPlus } from "react-icons/fi";

import useGetCollections from "@/app/hook/useGetCollections";
import Loading from "@/ui/Loading";
import ErrorMessage from "@/components/ErrorMessage";

import CollectionList from "./CollectionList";

import CreateCollectionModal from "./CreateCollectionModal";

function Collections() {
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    data: collections,
    isLoading,
    error,
  } = useGetCollections(workspaceId);

  if (!workspaceId) {
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  function openCreateModal() {
    setIsCreateModalOpen(true);
  }

  function closeCreateModal() {
    setIsCreateModalOpen(false);
  }

  const hasCollections = collections && collections.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}

      <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-indigo-600">API Workspace</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Collections
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Organize your API requests into structured collections.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-xl
            bg-indigo-600
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-indigo-700
          "
        >
          <FiPlus className="h-4 w-4" />
          New Collection
        </button>
      </section>

      {/* Content */}

      <section>
        {!hasCollections ? (
          <div
            className="
              flex
              min-h-72
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              border-dashed
              border-slate-300
              bg-white
              px-6
              text-center
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-indigo-50
                text-indigo-600
              "
            >
              <FiFolderPlus className="h-7 w-7" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-950">
              No collections yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Create your first collection to organize API requests and
              endpoints.
            </p>

            <button
              type="button"
              onClick={openCreateModal}
              className="
                mt-6
                rounded-xl
                border
                border-slate-200
                px-4
                py-2.5
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
              "
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
