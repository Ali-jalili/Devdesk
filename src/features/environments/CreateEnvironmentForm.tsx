/** @format */

import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useCreateEnvironment from "@/app/hook/useCreateEnvironment";

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
      className="rounded-xl border border-border p-5 space-y-4"
    >
      <input
        {...register("name")}
        placeholder="Environment name"
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
          disabled={isPending}
          type="submit"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {isPending ? "Creating..." : "Save"}
        </button>
      </div>
    </form>
  );
}
