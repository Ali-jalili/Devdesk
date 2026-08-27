/** @format */

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiGlobe, FiSave } from "react-icons/fi";

import useCreateEnvironment from "./hooks/useCreateEnvironment";

type FormData = {
  name: string;
};

interface Props {
  workspaceId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateEnvironmentForm({
  workspaceId,
  onSuccess,
  onCancel,
}: Props) {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const { mutate, isPending } = useCreateEnvironment();

  function submitForm(data: FormData) {
    mutate(
      {
        name: data.name,
        workspace_id: workspaceId,
      },
      {
        onSuccess() {
          toast.success("Environment created");
          reset();
          onSuccess();
        },

        onError(error) {
          toast.error(error.message);
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <FiGlobe size={18} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Create Environment
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            Add a new environment for this workspace.
          </p>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-slate-800">
          Environment Name
        </label>

        <input
          {...register("name", {
            required: true,
          })}
          placeholder="e.g. Development"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        />

        <p className="mt-2 text-xs text-slate-400">
          Use a clear name like Development, Staging, or Production.
        </p>
      </div>

      <div className="mt-5 flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Cancel
        </button>

        <button
          disabled={isPending}
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiSave size={16} />

          {isPending ? "Creating..." : "Create Environment"}
        </button>
      </div>
    </form>
  );
}
