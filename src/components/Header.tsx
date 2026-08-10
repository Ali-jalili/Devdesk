/** @format */

import { FiMenu } from "react-icons/fi";
import useAuth from "@/app/context/useAuth";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, handleSignOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          {user && (
            <button
              type="button"
              onClick={onMenuClick}
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 md:hidden"
              aria-label="Open navigation"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          )}

          {/* Logo */}
          <NavLink
            to={user ? "/app/dashboard" : "/"}
            className="flex items-center gap-2"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white shadow-sm shadow-indigo-600/20">
              D
            </span>

            <span className="text-lg font-bold tracking-tight text-slate-950">
              DevDesk
            </span>
          </NavLink>
        </div>

        {/* Actions */}
        {user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            Logout
          </button>
        ) : (
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-4 ${
                  isActive
                    ? "bg-slate-100 text-slate-950"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:px-4"
            >
              Sign Up
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
