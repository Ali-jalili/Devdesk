/** @format */

import { FiEdit2, FiFolder, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import EditCollectionModal from "./EditCollectionModal";

type Collection = {
  id: string;
  name: string;
  description: string;
  workspace_id: string;
};

interface CollectionListProps {
  collections: Collection[];
}

function CollectionList({ collections }: CollectionListProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  function openCollectionModal(collection: Collection) {
    setSelectedCollection(collection);
  }

  function closeCollectionModal() {
    setSelectedCollection(null);
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {collections.map((item) => (
        <article
          key={item.id}
          className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiFolder size={22} />
              </div>

              <h3 className="text-base font-semibold text-foreground">
                {item.name}
              </h3>
            </div>

            {/* Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenMenuId(openMenuId === item.id ? null : item.id)
                }
                className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                aria-label="Collection actions"
              >
                <FiMoreVertical size={19} />
              </button>

              {openMenuId === item.id && (
                <div className="absolute right-0 top-11 z-20 w-44 rounded-xl border border-border bg-card p-1.5 shadow-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenuId(null);
                      openCollectionModal(item);
                    }}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-muted"
                  >
                    <FiEdit2 size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-500/10"
                  >
                    <FiTrash2 size={15} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="mt-5 min-h-12 text-sm leading-6 text-muted-foreground">
            {item.description || "No description provided."}
          </p>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <div className="text-xs text-muted-foreground">API Requests</div>

            <button
              type="button"
              className="cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium text-primary transition hover:bg-primary/10"
            >
              Open →
            </button>
          </div>
        </article>
      ))}

      {/* Edit Modal */}
      {selectedCollection && (
        <EditCollectionModal
          collectionId={selectedCollection.id}
          workspaceId={selectedCollection.workspace_id}
          name={selectedCollection.name}
          description={selectedCollection.description}
          onClose={closeCollectionModal}
        />
      )}
    </div>
  );
}

export default CollectionList;
