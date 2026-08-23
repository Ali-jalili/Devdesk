/** @format */

import {
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiX,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const navigation = [
  {
    label: "Dashboard",
    to: "/app/dashboard",
    icon: FiGrid,
  },
  {
    label: "Workspaces",
    to: "/app/workspaces",
    icon: FiBriefcase,
  },
];

export default function Sidebar({
  collapsed,
  mobileOpen,
  onToggle,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px] md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-16 z-50 h-[calc(100vh-64px)]
          border-r border-slate-200 bg-white
          transition-all duration-200
          md:sticky md:z-30
          ${collapsed ? "md:w-[72px]" : "md:w-60"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex h-full flex-col p-3">
          {/* Mobile Close */}
          <div className="mb-3 flex justify-end md:hidden">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
              aria-label="Close navigation"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `
                    flex items-center rounded-lg px-3 py-2.5
                    text-sm font-medium transition
                    ${collapsed ? "md:justify-center" : ""}
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }
                    `
                  }
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />

                  <span
                    className={`
                      ml-3 truncate
                      transition-all duration-200
                      ${collapsed ? "md:hidden" : ""}
                    `}
                  >
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>

          {/* Collapse */}
          <div className="mt-auto hidden border-t border-slate-200 pt-3 md:block">
            <button
              type="button"
              onClick={onToggle}
              className={`
                flex w-full items-center rounded-lg px-3 py-2.5
                text-sm font-medium text-slate-500
                transition hover:bg-slate-50 hover:text-slate-950
                ${collapsed ? "justify-center" : ""}
              `}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <FiChevronRight className="h-[18px] w-[18px]" />
              ) : (
                <>
                  <FiChevronLeft className="h-[18px] w-[18px]" />
                  <span className="ml-3">Collapse</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
