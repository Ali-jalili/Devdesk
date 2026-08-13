/** @format */

import useWorkspaceDetails from "@/app/hook/useWorkspaceDetails";
import ErrorMessage from "@/components/ErrorMessage";
import { FiArrowLeft, FiMoreHorizontal, FiFolderPlus } from "react-icons/fi";
import Loading from "@/ui/Loading";
import { useNavigate, useParams } from "react-router-dom";

function WorkspaceDetails() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useWorkspaceDetails(workspaceId);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!workspaceId) return null;

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
        {/* Back */}
        <button
          onClick={() => navigate("/app/workspaces")}
          className="group mb-8 inline-flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <FiArrowLeft
            size={16}
            className="transition-transform duration-200 group-hover:-translate-x-1"
          />
          Workspaces
        </button>

        {/* Workspace Header */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />

              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Workspace
              </span>
            </div>

            <h1 className="truncate text-3xl font-semibold tracking-tight">
              {data?.name}
            </h1>

            {data?.description && (
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {data.description}
              </p>
            )}
          </div>

          <button
            type="button"
            aria-label="Workspace options"
            className="shrink-0 cursor-pointer rounded-lg border border-border p-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <FiMoreHorizontal size={19} />
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-border" />

        {/* Overview */}
        <section>
          <div className="mb-4">
            <h2 className="text-sm font-semibold">Overview</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A quick look at your workspace.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Collections */}
            <div className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Collections
                </span>

                <FiFolderPlus
                  size={18}
                  className="text-muted-foreground transition-colors group-hover:text-primary"
                />
              </div>

              <div className="mt-4 text-3xl font-semibold">0</div>

              <p className="mt-1 text-xs text-muted-foreground">
                API collections
              </p>
            </div>

            {/* Requests */}
            <div className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
              <span className="text-sm text-muted-foreground">Requests</span>

              <div className="mt-4 text-3xl font-semibold">0</div>

              <p className="mt-1 text-xs text-muted-foreground">API requests</p>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Collections</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Organize your API requests into collections.
              </p>
            </div>

            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-50"
            >
              + New Collection
            </button>
          </div>

          {/* Empty state */}
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 text-center">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
              <FiFolderPlus size={20} />
            </div>

            <h3 className="text-sm font-semibold">No collections yet</h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              Create your first collection to start organizing your API
              requests.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 cursor-not-allowed rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground opacity-50"
            >
              Create Collection
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default WorkspaceDetails;
