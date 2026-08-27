/** @format */

import { NavLink, useParams } from "react-router-dom";

import { FiGrid, FiFolder, FiGlobe } from "react-icons/fi";

const navigation = [
  {
    label: "Overview",
    path: "",
    icon: FiGrid,
  },
  {
    label: "Collections",
    path: "collections",
    icon: FiFolder,
  },
  {
    label: "Environments",
    path: "environments",
    icon: FiGlobe,
  },
];

interface WorkspaceSidebarNavProps {
  onClose?: () => void;
}

export default function WorkspaceSidebarNav({
  onClose,
}: WorkspaceSidebarNavProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.label}
            to={`/app/workspaces/${workspaceId}${item.path ? `/${item.path}` : ""}`}
            end={item.path === ""}
            onClick={onClose}
            className={({ isActive }) => `
              flex items-center gap-3
              rounded-lg
              px-3 py-2.5
              text-sm font-medium
              transition

              ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }
            `}
          >
            <Icon className="h-5 w-5 shrink-0" />

            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
