/** @format */

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

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
      className="space-y-4 rounded-xl border border-border p-5"
    >
      <input
        {...register("key")}
        placeholder="Variable key"
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
      />

      <input
        {...register("value")}
        placeholder="Variable value"
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-border px-4 py-2 text-sm"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
