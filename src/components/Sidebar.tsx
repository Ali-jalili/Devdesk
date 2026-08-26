/** @format */

import useAuth from "@/app/context/useAuth";

import {
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiLogOut,
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
  const { user, handleSignOut } = useAuth();

  const userName = user?.user_metadata?.name || "User";

  const avatar = userName.charAt(0).toUpperCase();

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="
            fixed inset-0 z-40
            bg-slate-950/30
            backdrop-blur-[2px]
            md:hidden
          "
        />
      )}

      <aside
        className={`
          fixed left-0 top-16 z-50
          h-[calc(100vh-64px)]

          border-r border-slate-200
          bg-white

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
              className="
                rounded-lg p-2
                text-slate-500
                transition
                hover:bg-slate-100
              "
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
                  end={item.to === "/app/dashboard"}
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

                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom */}

          <div className="mt-auto space-y-2">
            {/* User */}

            <div className="border-t border-slate-200 pt-3">
              <div
                className={`
                  flex items-center gap-3
                  rounded-lg px-3 py-2

                  ${collapsed ? "md:justify-center" : ""}
                `}
              >
                <div
                  className="
                    flex h-9 w-9 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-indigo-100
                    text-sm font-bold
                    text-indigo-600
                  "
                >
                  {avatar}
                </div>

                {!collapsed && (
                  <p
                    className="
                      truncate
                      text-sm
                      font-semibold
                      text-slate-900
                    "
                  >
                    {userName}
                  </p>
                )}
              </div>

              {!collapsed && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="
                    mt-2 flex w-full items-center gap-2
                    rounded-lg px-3 py-2
                    text-sm font-medium
                    text-slate-600
                    transition
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              )}
            </div>

            {/* Collapse */}

            <div className="hidden border-t border-slate-200 pt-3 md:block">
              <button
                type="button"
                onClick={onToggle}
                className={`
                  flex w-full items-center rounded-lg px-3 py-2.5
                  text-sm font-medium text-slate-500
                  transition hover:bg-slate-50 hover:text-slate-950

                  ${collapsed ? "justify-center" : ""}
                `}
              >
                {collapsed ? (
                  <FiChevronRight className="h-5 w-5" />
                ) : (
                  <>
                    <FiChevronLeft className="h-5 w-5" />

                    <span className="ml-3">Collapse</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
