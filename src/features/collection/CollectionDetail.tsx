/** @format */

import useGetCollection from "@/app/hook/useGetCollection";
import useGetRequests from "@/app/hook/useGetRequests";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import RequestList from "../requests/RequestList";

export default function CollectionDetail() {
  const { workspaceId, collectionId } = useParams<{
    workspaceId: string;
    collectionId: string;
  }>();

  const navigate = useNavigate();

  const { data: collection, isLoading } = useGetCollection(collectionId!);
  const { data } = useGetRequests(collectionId);
  console.log(data);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Loading collection...
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Collection not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Collection Context */}
      <header>
        <h1 className="text-xl font-semibold text-foreground">
          {collection.name}
        </h1>

        {collection.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {collection.description}
          </p>
        )}
      </header>

      {/* Request Workspace */}
      <section>
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Requests
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage API endpoints in this collection.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/app/workspaces/${collection.workspace_id}/collections/${collection.id}/requests/new`,
              )
            }
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <FiPlus size={16} />
            New Request
          </button>
        </div>

        {/* Request Toolbar - آماده برای آینده */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground">
            <FiSearch size={15} />
            Search requests
          </div>
        </div>

        {/* Empty Request State */}

        {data?.length === 0 ? (
          <div className="mt-6 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-border">
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                No requests yet
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Create your first API request for this collection.
              </p>
            </div>
          </div>
        ) : (
          <RequestList
            data={data!}
            workspaceId={workspaceId!}
            collectionId={collectionId!}
          />
        )}
      </section>
    </div>
  );
}
