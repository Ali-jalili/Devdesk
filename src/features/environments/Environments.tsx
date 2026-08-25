/** @format */

import { useState } from "react";
import { useParams } from "react-router-dom";

import useGetEnvironments from "@/app/hook/useGetEnvironments";

import Loading from "@/ui/Loading";

import EnvironmentList from "./EnvironmentList";
import CreateEnvironmentForm from "./CreateEnvironmentForm";

export default function Environments() {
  const [isCreating, setIsCreating] = useState(false);

  const { workspaceId } = useParams();

  const { data, isLoading } = useGetEnvironments(workspaceId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Environments</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your workspace environments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Create Environment
        </button>
      </div>

      {isCreating && (
        <CreateEnvironmentForm
          workspaceId={workspaceId!}
          onSuccess={() => setIsCreating(false)}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <EnvironmentList data={data || []} />
    </div>
  );
}
