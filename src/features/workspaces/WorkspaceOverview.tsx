/** @format */

import { useState } from "react";

import { useParams } from "react-router-dom";

import { FiFolder, FiLayers, FiTrash2 } from "react-icons/fi";

import useGetCollections from "@/app/hook/useGetCollections";

import DeleteWorkspaceAlert from "./DeleteWorkspaceAlert";

export default function WorkspaceOverview() {
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { data: collections } = useGetCollections(workspaceId);

  if (!workspaceId) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Overview Header */}

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Workspace Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A quick look at your workspace.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Collections */}

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Collections
              </span>

              <FiFolder className="h-5 w-5 text-indigo-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-950">
              {collections?.length ?? 0}
            </p>

            <p className="mt-1 text-xs text-slate-400">API collections</p>
          </div>

          {/* Environments */}

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Environments
              </span>

              <FiLayers className="h-5 w-5 text-indigo-600" />
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-950">0</p>

            <p className="mt-1 text-xs text-slate-400">
              Configured environments
            </p>
          </div>
        </div>
      </section>

      {/* Danger Zone */}

      <section className="border-t border-slate-200 pt-6">
        <div>
          <h3 className="text-sm font-semibold text-red-700">Danger Zone</h3>

          <p className="mt-1 text-sm text-slate-600">
            Permanently delete this workspace and its data.
          </p>

          <button
            type="button"
            onClick={() => setIsDeleteAlertOpen(true)}
            className="
        mt-4
        inline-flex
        items-center
        gap-2
        rounded-lg
        border
        border-red-200
        px-4
        py-2
        text-sm
        font-semibold
        text-red-600
        transition
        hover:bg-red-50
      "
          >
            <FiTrash2 className="h-4 w-4" />
            Delete Workspace
          </button>
        </div>
      </section>

      <DeleteWorkspaceAlert
        workspaceId={workspaceId}
        open={isDeleteAlertOpen}
        onOpenChange={setIsDeleteAlertOpen}
      />
    </div>
  );
}
