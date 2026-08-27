/** @format */

import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBriefcase } from "react-icons/fi";

interface RecentWorkspacesProps {
  workspaces: { id: string; name: string }[];
  hasLocalHistory: boolean;
}

export default function RecentWorkspaces({
  workspaces,
  hasLocalHistory,
}: RecentWorkspacesProps) {
  if (!workspaces.length) return null;

  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Your workspace trail
        </p>
        <h2 className="mt-1 text-lg font-bold text-slate-950">
          {hasLocalHistory ? "Recently opened" : "Recent workspaces"}
        </h2>
      </div>

      <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {workspaces.map((workspace) => (
          <Link
            key={workspace.id}
            to={`/app/workspaces/${workspace.id}`}
            className="group flex items-center gap-3 p-4 transition hover:bg-slate-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <FiBriefcase className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-700">
              {workspace.name}
            </span>
            <FiArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-indigo-600" />
          </Link>
        ))}
      </div>
    </section>
  );
}
