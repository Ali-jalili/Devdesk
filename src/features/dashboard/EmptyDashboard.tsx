/** @format */

import { NavLink } from "react-router-dom";

export default function EmptyDashboard() {
  return (
    <section className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h4.19c.6 0 1.17.24 1.59.66l1.12 1.12c.42.42.99.66 1.59.66H18A2.25 2.25 0 0 1 20.25 9.2v8.05A2.25 2.25 0 0 1 18 19.5H6a2.25 2.25 0 0 1-2.25-2.25V6.75Z"
            />
          </svg>
        </div>

        {/* Content */}
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Welcome to DevDesk
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-slate-500">
          You don't have a workspace yet. Create your first workspace to
          organize your API requests, collections, and environments in one
          place.
        </p>

        {/* Action */}
        <NavLink
          to="/app/workspaces/new"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20"
        >
          <span className="text-lg leading-none">+</span>
          Create your first workspace
        </NavLink>

        {/* Hint */}
        <div className="mx-auto mt-10 grid max-w-lg gap-3 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-800">Workspace</p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Your project space
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-800">Collections</p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Organize your requests
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-800">Environments</p>

            <p className="mt-1 text-xs leading-5 text-slate-400">
              Manage API variables
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
