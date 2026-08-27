/** @format */

import { useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlus, FiSliders } from "react-icons/fi";

import useGetVariables from "./hooks/useGetVariables";

import Loading from "@/ui/Loading";
import ErrorMessage from "@/components/ErrorMessage";

import CreateVariableForm from "./CreateVariableForm";
import VariableList from "./VariableList";

export default function EnvironmentDetail() {
  const [isCreating, setIsCreating] = useState(false);

  const { environmentId } = useParams<{
    environmentId: string;
  }>();

  const { data, isLoading, error } = useGetVariables(environmentId);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!environmentId) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            Environment configuration
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Variables
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Manage environment variables used by your API requests.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <FiPlus className="h-4 w-4" />
          Add Variable
        </button>
      </section>

      {/* Create Variable */}

      {isCreating && (
        <section>
          <CreateVariableForm
            environmentId={environmentId}
            onSuccess={() => setIsCreating(false)}
            onCancel={() => setIsCreating(false)}
          />
        </section>
      )}

      {/* Variables */}

      {data && data.length > 0 ? (
        <VariableList data={data} />
      ) : (
        <section className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FiSliders className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-950">
            No variables yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Add variables like API URLs, tokens, and configuration values.
          </p>

          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <FiPlus className="h-4 w-4" />
            Create Variable
          </button>
        </section>
      )}
    </div>
  );
}
