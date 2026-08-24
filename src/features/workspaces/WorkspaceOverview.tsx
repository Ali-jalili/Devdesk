/** @format */

import useGetCollections from "@/app/hook/useGetCollections";
import { FiFolderPlus } from "react-icons/fi";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import DeleteWorkspaceAlert from "./DeleteWorkspaceAlert";

function WorkspaceOverview() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { data: collections } = useGetCollections(workspaceId);

  if (!workspaceId) return null;

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
            <div className="text-sm text-muted-foreground">Requests</div>

            <div className="mt-4 text-3xl font-semibold">0</div>

            <p className="mt-1 text-xs text-muted-foreground">API requests</p>
          </div>
        </div>
      </section>

      {/* Collections Entry Point */}

      <section className="mt-10 border-t border-border pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Collections
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your API request collections.
            </p>
          </div>

          <NavLink
            to={`/app/workspaces/${workspaceId}/collections`}
            className="text-sm font-medium text-primary transition hover:underline"
          >
            View →
          </NavLink>
        </div>
      </section>

      {/* Danger Zone */}

      <section className="mt-10 border-t border-border pt-8">
        <h2 className="text-sm font-semibold text-red-600">Danger Zone</h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Permanently delete this workspace and all related data.
        </p>

        <button
          onClick={() => setIsDeleteAlertOpen(true)}
          type="button"
          className="mt-4 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Delete Workspace
        </button>
      </section>

      <DeleteWorkspaceAlert
        workspaceId={workspaceId}
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
      />
    </div>
  );
}

export default WorkspaceOverview;
