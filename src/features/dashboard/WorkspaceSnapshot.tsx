/** @format */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiFolder,
  FiGlobe,
  FiSend,
} from "react-icons/fi";

interface WorkspaceSnapshotProps {
  workspace?: {
    id: string;
    name: string;
    collections: number;
    requests: number;
    environments: number;
    lastActivity: string | null;
  } | null;
  workspaceLoading: boolean;
}

export default function WorkspaceSnapshot({
  workspace,
  workspaceLoading,
}: WorkspaceSnapshotProps) {
  if (workspaceLoading) return null;
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="border-b border-slate-200 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Last active workspace
            </div>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              {workspace?.name ?? "No workspace yet"}
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
              {workspace
                ? "Your workspace context is ready. Pick up your API workflow where you left off."
                : "Create your first workspace to start organizing your API workflows."}
            </p>

            {workspace && (
              <p className="mt-4 text-xs font-medium text-slate-400">
                Last activity: {workspace.lastActivity ?? "No activity yet"}
              </p>
            )}
          </div>

          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <FiBriefcase className="h-5 w-5" />
          </span>
        </div>

        <Link
          to={
            workspace
              ? `/app/workspaces/${workspace.id}`
              : "/app/workspaces/new"
          }
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          {workspace ? "Open Workspace" : "Create Workspace"}
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {workspace && (
        <div className="grid divide-y divide-slate-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Link
            to={`/app/workspaces/${workspace.id}/collections`}
            className="group flex items-center gap-3 p-4 transition hover:bg-slate-50 sm:p-5"
          >
            <FiFolder className="h-5 w-5 text-indigo-600" />
            <span>
              <strong className="block text-lg text-slate-950">
                {workspace.collections}
              </strong>
              <span className="text-xs text-slate-500">Collections</span>
            </span>
            <FiArrowRight className="ml-auto h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-indigo-600" />
          </Link>

          <Link
            to={`/app/workspaces/${workspace.id}/collections`}
            className="group flex items-center gap-3 p-4 transition hover:bg-slate-50 sm:p-5"
          >
            <FiSend className="h-5 w-5 text-blue-600" />
            <span>
              <strong className="block text-lg text-slate-950">
                {workspace.requests}
              </strong>
              <span className="text-xs text-slate-500">API requests</span>
            </span>
            <FiArrowRight className="ml-auto h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
          </Link>

          <Link
            to={`/app/workspaces/${workspace.id}/environments`}
            className="group flex items-center gap-3 p-4 transition hover:bg-slate-50 sm:p-5"
          >
            <FiGlobe className="h-5 w-5 text-emerald-600" />
            <span>
              <strong className="block text-lg text-slate-950">
                {workspace.environments}
              </strong>
              <span className="text-xs text-slate-500">Environments</span>
            </span>
            <FiArrowRight className="ml-auto h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600" />
          </Link>
        </div>
      )}
    </motion.section>
  );
}
