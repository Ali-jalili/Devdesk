/** @format */

import Loading from "@/ui/Loading";
import useGetWorkspaces from "./useWorkspaces";
import ErrorMessage from "@/components/ErrorMessage";

export default function Workspaces() {
  const { data, isLoading, error } = useGetWorkspaces();

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            Your workspaces
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Workspaces
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage your API projects, collections, requests, and
                environments from your workspaces.
              </p>
            </div>

            <button
              type="button"
              className="w-fit rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
            >
              + New Workspace
            </button>
          </div>
        </div>

        {/* Workspace Grid */}
        {data?.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <h2 className="text-base font-semibold text-slate-900">
              No workspaces yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Create your first workspace to start organizing your API projects
              and requests.
            </p>

            <button
              type="button"
              className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Create Workspace
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  <button
                    type="button"
                    className="rounded-lg px-2 py-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`More options for ${item.name}`}
                  >
                    •••
                  </button>
                </div>

                <h2 className="truncate text-base font-semibold text-slate-900">
                  {item.name}
                </h2>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-medium text-slate-400">
                    Workspace
                  </span>

                  <button
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
