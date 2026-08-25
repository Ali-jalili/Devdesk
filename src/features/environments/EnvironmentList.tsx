/** @format */

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
  if (data.length === 0) {
    return (
      <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-border">
        <div className="text-center">
          <p className="text-sm font-medium">No environments yet</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Create your first environment for this workspace.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.id} className="rounded-xl border border-border p-4">
          <h3 className="font-medium">{item.name}</h3>
        </div>
      ))}
    </div>
  );
}
