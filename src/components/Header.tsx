/** @format */

import useAuth from "@/app/context/useAuth";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { user, handleSignOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
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

        {/* Navigation */}
        {user ? (
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
          >
            Logout
          </button>
        ) : (
          <nav className="flex items-center gap-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition ${
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
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-indigo-700 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`
              }
            >
              Sign Up
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}
