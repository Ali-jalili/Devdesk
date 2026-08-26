/** @format */

import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiGlobe, FiPlus } from "react-icons/fi";

import useGetEnvironments from "@/app/hook/useGetEnvironments";
import Loading from "@/ui/Loading";

import EnvironmentList from "./EnvironmentList";
import CreateEnvironmentForm from "./CreateEnvironmentForm";

export default function Environments() {
  const [isCreating, setIsCreating] = useState(false);

  const { workspaceId } = useParams<{
    workspaceId: string;
  }>();

  const { data, isLoading } = useGetEnvironments(workspaceId);

  if (isLoading) {
    return <Loading />;
  }

  if (!workspaceId) {
    return null;
  }

  const hasEnvironments = data && data.length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}

      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            Workspace environments
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Environments
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Manage API variables and configurations for different setups.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <FiPlus className="h-4 w-4" />
          New Environment
        </button>
      </section>

      {/* Create Form */}

      {isCreating && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <CreateEnvironmentForm
            workspaceId={workspaceId}
            onSuccess={() => setIsCreating(false)}
            onCancel={() => setIsCreating(false)}
          />
        </section>
      )}

      {/* Content */}

      {hasEnvironments ? (
        <EnvironmentList data={data} />
      ) : (
        <section className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FiGlobe className="h-8 w-8" />
          </div>

          <h2 className="mt-6 text-xl font-semibold text-slate-950">
            Create your first environment
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            Environments allow you to manage API variables like URLs, tokens,
            and configurations for different setups.
          </p>

          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <FiPlus className="h-4 w-4" />
            Create Environment
          </button>
        </section>
      )}
    </div>
  );
}
