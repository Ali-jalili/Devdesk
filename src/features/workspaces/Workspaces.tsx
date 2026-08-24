/** @format */

import Loading from "@/ui/Loading";
import useGetWorkspaces from "../../app/hook/useWorkspaces";
import ErrorMessage from "@/components/ErrorMessage";
import { NavLink, useNavigate } from "react-router-dom";
import { FiBriefcase, FiArrowRight } from "react-icons/fi";

export default function Workspaces() {
  const { data, isLoading, error } = useGetWorkspaces();
  const navigate = useNavigate();

  if (isLoading) return <Loading />;

  if (error) return <ErrorMessage message={error.message} />;

  function showDataWorkSpace(id: string) {
    navigate(`/app/workspaces/${id}`);
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            Your workspaces
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Workspaces
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage your API projects, collections, requests, and
                environments from one place.
              </p>
            </div>

            {data && data.length > 0 && (
              <NavLink
                to="/app/workspaces/new"
                className="inline-flex w-fit items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              >
                + New Workspace
              </NavLink>
            )}
          </div>
        </div>

        {/* Empty State */}
        {data?.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <FiBriefcase className="h-8 w-8" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-slate-900">
              Create your first workspace
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Workspaces help you organize API projects, collections, requests,
              and environments in a clean structure.
            </p>

            <NavLink
              to="/app/workspaces/new"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            >
              Create Workspace
              <FiArrowRight className="h-4 w-4" />
            </NavLink>
          </div>
        ) : (
          /* Workspace Cards */
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
                  {item.name.charAt(0).toUpperCase()}
                </div>

                <h2 className="mt-5 truncate text-lg font-semibold text-slate-900">
                  {item.name}
                </h2>

                <p className="mt-2 line-clamp-3 min-h-[72px] text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Workspace
                  </span>

                  <button
                    onClick={() => showDataWorkSpace(item.id)}
                    type="button"
                    className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                  >
                    Open →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
