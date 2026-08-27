/** @format */

import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import WorkspaceNavigation from "./WorkspaceNavigation";
import useWorkspaceDetails from "@/app/hook/useWorkspaceDetails";
import Loading from "@/ui/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import EditWorkspaceModal from "./EditWorkspaceModal";
import useUpdateWorkspaceEnvironment from "@/app/hook/useUpdateWorkspaceEnvironment";
import useGetEnvironments from "@/app/hook/useGetEnvironments";

export default function WorkspaceLayout() {
  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data, isLoading, error } = useWorkspaceDetails(workspaceId);
  const { data: environments } = useGetEnvironments(workspaceId);

  const { mutate: updateEnvironment, isPending: isUpdatingEnvironment } =
    useUpdateWorkspaceEnvironment();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data || !workspaceId) {
    return null;
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Workspace Header */}

        <section className="border-b border-slate-200 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />

                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Workspace
                </span>
              </div>

              <h1 className="truncate text-3xl font-bold tracking-tight text-slate-950">
                {data.name}
              </h1>

              {data.description && (
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  {data.description}
                </p>
              )}
              {environments && environments.length > 0 && (
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-500">
                    Environment
                  </span>

                  <select
                    value={data.active_environment_id ?? ""}
                    disabled={isUpdatingEnvironment}
                    onChange={(e) =>
                      updateEnvironment({
                        workspaceId,
                        environmentId: e.target.value || null,
                      })
                    }
                    className="
        rounded-lg
        border
        border-slate-200
        bg-white
        px-3
        py-2
        text-sm
        font-medium
        text-slate-700
        outline-none
        transition
        focus:border-indigo-400
      "
                  >
                    <option value="">Select environment</option>

                    {environments.map((environment) => (
                      <option key={environment.id} value={environment.id}>
                        {environment.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
            >
              <FiEdit3 className="h-4 w-4" />
              Edit
            </button>
          </div>
        </section>

        {/* Workspace Navigation */}

        <div className="mt-5">
          <WorkspaceNavigation />
        </div>

        {/* Current Page */}

        <div className="mt-8">
          <Outlet />
        </div>

        {isEditModalOpen && (
          <EditWorkspaceModal
            workspaceId={workspaceId}
            name={data.name}
            description={data.description}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </div>
    </main>
  );
}
