/** @format */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useUpdateVariable from "@/app/hook/useUpdateVariable";

import VariableDeleteButton from "./VariableDeleteButton";

type Variable = {
  id: string;
  environment_id: string;
  key: string;
  value: string;
  created_at: string;
};

type FormData = {
  key: string;
  value: string;
};

interface VariableListProps {
  data: Variable[];
}

export default function VariableList({ data }: VariableListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const { mutate, isPending } = useUpdateVariable();

  const { register, handleSubmit, reset } = useForm<FormData>();

  function startEdit(item: Variable) {
    setEditingId(item.id);

    reset({
      key: item.key,
      value: item.value,
    });
  }

  function cancelEdit() {
    setEditingId(null);

    reset();
  }

  function submitEdit(data: FormData) {
    if (!editingId) return;

    mutate(
      {
        variableId: editingId,
        data,
      },

      {
        onSuccess() {
          toast.success("Variable updated");

          setEditingId(null);

          reset();
        },

        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

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
          className="rounded-xl border border-border bg-background p-4"
        >
          {editingId === item.id ? (
            <form onSubmit={handleSubmit(submitEdit)} className="space-y-3">
              <input
                {...register("key")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />

              <input
                {...register("value")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-lg border border-border px-3 py-1 text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">{item.key}</p>

                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded-lg border border-border px-3 py-1 text-sm"
                >
                  Edit
                </button>

                <VariableDeleteButton variableId={item.id} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
