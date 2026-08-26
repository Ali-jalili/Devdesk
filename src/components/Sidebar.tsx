/** @format */

import toast from "react-hot-toast";
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
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const navigation = [
  { label: "Dashboard", to: "/app/dashboard", icon: FiGrid },
  { label: "Workspaces", to: "/app/workspaces", icon: FiBriefcase },
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function logoutHandler() {
    try {
      setIsLoggingOut(true);
      await handleSignOut();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      {/* Overlay for mobile */}
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

          /* Mobile fixed width */
          w-72

          /* Tablet & up: width depends on collapsed */
          md:sticky md:z-30
          ${collapsed ? "md:w-[72px]" : "md:w-60"}

          /* Slide in/out for mobile */
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex h-full flex-col p-3">
          {/* Mobile close button */}
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
                  className={({ isActive }) => `
                    flex items-center
                    rounded-lg
                    px-3 py-2.5
                    text-sm font-medium
                    transition
                    ${collapsed ? "md:justify-center" : ""}
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }
                  `}
                >
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="mt-auto space-y-3">
            {/* ------ User area (optimized for mobile) ------ */}
            <div>
              {/* Mobile & tablet: compact row with avatar + logout icon */}
              <div className="flex items-center justify-between px-1 md:hidden">
                <div
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-indigo-100
                    text-xs font-bold
                    text-indigo-600
                    ring-2 ring-white
                    shadow-sm
                  "
                >
                  {avatar}
                </div>
                <button
                  type="button"
                  onClick={logoutHandler}
                  disabled={isLoggingOut}
                  aria-label="Logout"
                  className="
                    rounded-lg p-2
                    text-slate-400
                    transition
                    hover:bg-red-50 hover:text-red-500
                    disabled:opacity-50
                  "
                >
                  <FiLogOut className="h-5 w-5" />
                </button>
              </div>

              {/* Desktop (md+) : full user card with name + logout button */}
              <div
                className={`
                  hidden md:block
                  rounded-xl
                  bg-slate-50/80
                  p-3
                  transition
                  hover:bg-slate-100/80
                  ${collapsed ? "md:p-2" : ""}
                `}
              >
                <div
                  className={`
                    flex items-center gap-3
                    ${collapsed ? "md:justify-center" : ""}
                  `}
                >
                  {/* Avatar */}
                  <div
                    className="
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-full
                      bg-indigo-100
                      text-base font-bold
                      text-indigo-600
                      ring-2 ring-white
                      shadow-sm
                    "
                  >
                    {avatar}
                  </div>

                  {/* User name (hidden when collapsed) */}
                  {!collapsed && (
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {userName}
                      </p>
                    </div>
                  )}
                </div>

                {/* Logout button (hidden when collapsed) */}
                {!collapsed && (
                  <button
                    type="button"
                    onClick={logoutHandler}
                    disabled={isLoggingOut}
                    className="
                      mt-2
                      flex w-full items-center justify-center gap-2
                      rounded-lg
                      border border-transparent
                      px-3 py-1.5
                      text-sm font-medium
                      text-red-600
                      transition
                      hover:border-red-200 hover:bg-red-50
                      disabled:opacity-60
                    "
                  >
                    <FiLogOut className="h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                )}
              </div>
            </div>

            {/* Collapse toggle (desktop only) */}
            <div className="hidden border-t border-slate-200 pt-3 md:block">
              <button
                type="button"
                onClick={onToggle}
                className={`
                  flex w-full items-center
                  rounded-lg
                  px-3 py-2.5
                  text-sm font-medium
                  text-slate-500
                  transition
                  hover:bg-slate-50
                  hover:text-slate-950
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
