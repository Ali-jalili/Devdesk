/** @format */

import { useState } from "react";

import { Link, useParams } from "react-router-dom";

import { FiArrowRight, FiFolder, FiLayers, FiTrash2 } from "react-icons/fi";

import useGetCollections from "@/features/collection/hooks/useGetCollections";
import useGetEnvironments from "@/features/environments/hooks/useGetEnvironments";

import DeleteWorkspaceAlert from "./DeleteWorkspaceAlert";

export default function WorkspaceOverview() {
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { data: collections } = useGetCollections(workspaceId);
  const { data: environments } = useGetEnvironments(workspaceId);

  if (!workspaceId) {
    return null;
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Workspace snapshot
            </p>

            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950">
              Project at a glance
            </h2>
          </div>

          <span className="hidden text-xs font-medium text-slate-400 sm:block">
            Live data
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Collections */}

          <Link
            to={`/app/workspaces/${workspaceId}/collections`}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-slate-500">
                  Collections
                </span>

                <p className="mt-1 text-xs text-slate-400">
                  Organized API groups
                </p>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <FiFolder className="h-5 w-5" />
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-950">
              {collections?.length ?? 0}
            </p>

            <span className="mt-4 inline-flex text-sm font-semibold text-indigo-600">
              View collections
              <FiArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Environments */}

          <Link
            to={`/app/workspaces/${workspaceId}/environments`}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-slate-500">
                  Environments
                </span>

                <p className="mt-1 text-xs text-slate-400">
                  Runtime configurations
                </p>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <FiLayers className="h-5 w-5" />
              </span>
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-950">
              {environments?.length ?? 0}
            </p>

            <span className="mt-4 inline-flex text-sm font-semibold text-emerald-600">
              Manage environments
              <FiArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
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
