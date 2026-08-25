/** @format */

import { useState } from "react";
import { useParams } from "react-router-dom";

import useGetVariables from "@/app/hook/useGetVariables";

import Loading from "@/ui/Loading";

import CreateVariableForm from "./CreateVariableForm";

export default function EnvironmentDetail() {
  const [isCreating, setIsCreating] = useState(false);

  const { environmentId } = useParams();

  const { data, isLoading } = useGetVariables(environmentId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Environment Variables</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your environment variables.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Add Variable
        </button>
      </div>

      {/* Create Form */}
      {isCreating && (
        <CreateVariableForm
          environmentId={environmentId!}
          onSuccess={() => setIsCreating(false)}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {/* Variables List */}
      {data && data.length > 0 ? (
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.id} className="rounded-xl border border-border p-4">
              <p className="font-medium">{item.key}</p>

              <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border">
          <div className="text-center">
            <p className="text-sm font-medium">No variables yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add your first environment variable.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
