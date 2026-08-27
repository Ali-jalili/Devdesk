/** @format */

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FiKey, FiPlus, FiSave } from "react-icons/fi";

import useCreateVariable from "@/app/hook/useCreateVariable";

type FormData = {
  key: string;
  value: string;
};

interface CreateVariableFormProps {
  environmentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateVariableForm({
  environmentId,
  onSuccess,
  onCancel,
}: CreateVariableFormProps) {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const { mutate, isPending } = useCreateVariable();

  function submitForm(data: FormData) {
    mutate(
      {
        environment_id: environmentId,
        key: data.key,
        value: data.value,
      },
      {
        onSuccess() {
          toast.success("Variable created");
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
      className="w-full max-w-md border-b border-slate-200 pb-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
          <FiPlus size={14} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Add Variable</h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Add a key and value for this environment.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <FiKey className="absolute left-3 top-3 text-slate-400" size={14} />

          <input
            {...register("key", {
              required: true,
            })}
            placeholder="Variable key"
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        <div>
          <input
            {...register("value", {
              required: true,
            })}
            placeholder="Variable value"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          disabled={isPending}
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          <FiSave size={15} />

          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
