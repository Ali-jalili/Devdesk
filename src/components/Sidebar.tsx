/** @format */

import toast from "react-hot-toast";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import {
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiGrid,
  FiLogOut,
  FiX,
} from "react-icons/fi";

import useAuth from "@/app/context/useAuth";
import WorkspaceSidebarNav from "./WorkspaceSidebarNav";

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

  const { workspaceId } = useParams<{
    workspaceId?: string;
  }>();

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

      <motion.aside
        initial={{
          x: -20,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={`
          fixed left-0 top-16 z-50
          h-[calc(100vh-64px)]
          border-r border-slate-200
          bg-white
          transition-all duration-200

          w-72

          md:sticky md:z-30
          ${collapsed ? "md:w-[72px]" : "md:w-60"}

          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex h-full flex-col p-3">
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

            <AnimatePresence mode="wait">
              {workspaceId && (
                <motion.div
                  key="workspace-navigation"
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="mt-4 overflow-hidden border-t border-slate-200 pt-4"
                >
                  {!collapsed && (
                    <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Workspace
                    </p>
                  )}

                  <WorkspaceSidebarNav onClose={onClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
          <div className="mt-auto space-y-3">
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
                <div
                  className="
                    flex h-10 w-10 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-indigo-100
                    text-base font-bold
                    text-indigo-600
                  "
                >
                  {avatar}
                </div>

                {!collapsed && (
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {userName}
                    </p>
                  </div>
                )}
              </div>

              {!collapsed && (
                <button
                  type="button"
                  onClick={logoutHandler}
                  disabled={isLoggingOut}
                  className="
                    mt-2
                    flex w-full items-center justify-center gap-2
                    rounded-lg
                    px-3 py-1.5
                    text-sm font-medium
                    text-red-600
                    transition
                    hover:bg-red-50
                    disabled:opacity-60
                  "
                >
                  <FiLogOut className="h-4 w-4" />

                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              )}
            </div>

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
      </motion.aside>
    </>
  );
}
