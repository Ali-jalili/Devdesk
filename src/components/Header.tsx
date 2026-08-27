/** @format */

import { FiCode, FiMenu } from "react-icons/fi";

import useAuth from "@/app/context/useAuth";

import { NavLink } from "react-router-dom";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-50 h-16
        border-b border-slate-200
        bg-white/90 backdrop-blur
      "
    >
      <div
        className="
          flex h-full items-center justify-between
          px-4 sm:px-6 lg:px-8
        "
      >
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}

          {user && (
            <button
              type="button"
              onClick={onMenuClick}
              className="
                rounded-lg p-2
                text-slate-600
                transition
                hover:bg-slate-100
                hover:text-slate-950
                md:hidden
              "
              aria-label="Open navigation"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          )}

          {/* Brand */}

          <NavLink
            to={user ? "/app/dashboard" : "/"}
            className="
              group flex items-center gap-3
            "
          >
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                bg-indigo-600
                text-white
                shadow-sm shadow-indigo-600/20
                transition
                group-hover:scale-105
              "
            >
              <FiCode className="h-5 w-5" />
            </div>

            <div className="flex flex-col leading-none">
              <span
                className="
                  text-lg font-bold
                  tracking-tight
                  text-slate-950
                "
              >
                DevDesk
              </span>

              <span
                className="
                  mt-1 text-[11px]
                  font-medium
                  tracking-wide
                  text-slate-400
                "
              >
                API Workspace
              </span>
            </div>
          </NavLink>
        </div>

        {/* Public Actions */}

        {!user && (
          <nav
            className="
              flex items-center gap-1 sm:gap-2
            "
          >
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `
                rounded-lg px-3 py-2
                text-sm font-semibold
                transition sm:px-4

                ${
                  isActive
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }
                `
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className="
                rounded-lg
                bg-indigo-600
                px-3 py-2
                text-sm font-semibold
                text-white
                transition
                hover:bg-indigo-700
                sm:px-4
              "
            >
              Sign Up
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
