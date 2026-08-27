/** @format */

import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBriefcase, FiFolder, FiPlus } from "react-icons/fi";

interface DashboardQuickActionsProps {
  workspaceId?: string;
}

export default function DashboardQuickActions({
  workspaceId,
}: DashboardQuickActionsProps) {
  const actions = [
    {
      label: "New Workspace",
      to: "/app/workspaces/new",
      icon: FiBriefcase,
    },
    {
      label: "New Collection",
      to: workspaceId
        ? `/app/workspaces/${workspaceId}/collections`
        : "/app/workspaces",
      icon: FiFolder,
    },
    {
      label: "New Request",
      to: workspaceId
        ? `/app/workspaces/${workspaceId}/collections`
        : "/app/workspaces",
      icon: FiPlus,
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Shortcuts
        </p>
        <h2 className="mt-1 text-lg font-bold text-slate-950">Quick actions</h2>
      </div>

      <div className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              to={action.to}
              className="group flex items-center gap-3 p-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-indigo-600"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">
                <Icon className="h-4 w-4" />
              </span>
              {action.label}
              <FiArrowUpRight className="ml-auto h-4 w-4 text-slate-300 transition group-hover:text-indigo-600" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
