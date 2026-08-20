/** @format */

import { FiFolder } from "react-icons/fi";

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
  console.log(collections);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {collections.map((item) => (
        <button
          key={item.id}
          type="button"
          className="group rounded-xl border border-border bg-card p-5 text-left transition hover:border-primary/40 hover:bg-primary/5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <FiFolder size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-foreground">{item.name}</h3>

                <p className="mt-1 text-sm text-muted-foreground">Collection</p>
              </div>
            </div>
          </div>

          {item.description && (
            <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          )}

          <div className="mt-4 text-xs text-muted-foreground transition group-hover:text-primary">
            Open collection →
          </div>
        </button>
      ))}
    </div>
  );
}

export default CollectionList;
