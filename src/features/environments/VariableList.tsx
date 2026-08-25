/** @format */

import VariableDeleteButton from "./VariableDeleteButton";

type Variable = {
  id: string;
  environment_id: string;
  key: string;
  value: string;
  created_at: string;
};

interface VariableListProps {
  data: Variable[];
}

export default function VariableList({ data }: VariableListProps) {
  if (data.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border">
        <div className="text-center">
          <p className="text-sm font-medium">No variables yet</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Add your first environment variable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-xl border border-border bg-background p-4"
        >
          <div className="space-y-1">
            <p className="font-medium">{item.key}</p>

            <p className="text-sm text-muted-foreground">{item.value}</p>
          </div>

          <VariableDeleteButton variableId={item.id} />
        </div>
      ))}
    </div>
  );
}
