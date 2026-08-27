/** @format */

import { FiChevronDown, FiGlobe } from "react-icons/fi";

import useWorkspaceDetails from "@/app/hook/useWorkspaceDetails";
import useGetEnvironments from "@/app/hook/useGetEnvironments";
import useUpdateWorkspaceEnvironment from "@/app/hook/useUpdateWorkspaceEnvironment";

interface WorkspaceSidebarHeaderProps {
  workspaceId: string;
}

export default function WorkspaceSidebarHeader({
  workspaceId,
}: WorkspaceSidebarHeaderProps) {
  const { data: workspace } = useWorkspaceDetails(workspaceId);

  const { data: environments } = useGetEnvironments(workspaceId);

  const { mutate: updateEnvironment, isPending: isUpdatingEnvironment } =
    useUpdateWorkspaceEnvironment();

  if (!workspace) {
    return null;
  }

  return (
    <div className="mb-4 rounded-xl bg-slate-50 p-3">
      {/* Workspace name */}
      <div className="flex items-center gap-2">
        <div
          className="
            flex h-8 w-8
            items-center justify-center
            rounded-lg
            bg-indigo-100
            text-indigo-600
          "
        >
          <FiGlobe className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Workspace
          </p>

          <p className="truncate text-sm font-semibold text-slate-900">
            {workspace.name}
          </p>
        </div>
      </div>

      {/* Environment */}
      {environments && environments.length > 0 && (
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-slate-500">
            Environment
          </label>

          <div className="relative">
            <select
              value={workspace.active_environment_id ?? ""}
              disabled={isUpdatingEnvironment}
              onChange={(e) =>
                updateEnvironment({
                  workspaceId,
                  environmentId: e.target.value || null,
                })
              }
              className="
                w-full
                appearance-none
                rounded-lg
                border border-slate-200
                bg-white
                px-3 py-2
                pr-8
                text-sm
                font-medium
                text-slate-700
                outline-none
                transition
                focus:border-indigo-400
                disabled:opacity-60
              "
            >
              <option value="">Select environment</option>

              {environments.map((environment) => (
                <option key={environment.id} value={environment.id}>
                  {environment.name}
                </option>
              ))}
            </select>

            <FiChevronDown
              className="
                pointer-events-none
                absolute
                right-2.5
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-slate-400
              "
            />
          </div>
        </div>
      )}
    </div>
  );
}
