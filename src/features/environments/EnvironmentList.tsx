/** @format */

import { useNavigate } from "react-router-dom";
import EnvironmentDeleteButton from "./EnvironmentDeleteButton";

type Environment = {
  id: string;
  name: string;
  workspace_id: string;
  created_at: string;
};

interface EnvironmentListProps {
  data: Environment[];
}

export default function EnvironmentList({ data }: EnvironmentListProps) {
  const navigate = useNavigate();

  if (data.length === 0) {
    return (
      <div className="mt-6 flex min-h-56 items-center justify-center rounded-xl border border-dashed border-border">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            No environments yet
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Create your first environment for this workspace.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {data.map((item) => (
        <div
          key={item.id}
          className="group rounded-xl border border-border bg-background p-5 text-left transition hover:border-primary/50 hover:bg-muted/50"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">{item.name}</h3>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/app/workspaces/${item.workspace_id}/environments/${item.id}`,
                )
              }
              className="text-sm text-muted-foreground transition group-hover:text-primary"
            >
              →
            </button>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Manage environment variables
          </p>

          <p className="mt-4 mb-4 text-xs text-muted-foreground">
            Created {new Date(item.created_at).toLocaleDateString()}
          </p>

          <EnvironmentDeleteButton environmentId={item.id} />
        </div>
      ))}
    </div>
  );
}
