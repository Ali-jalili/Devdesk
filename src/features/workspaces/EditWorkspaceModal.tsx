/** @format */

import { FiX } from "react-icons/fi";
import { useForm } from "react-hook-form";
import useUpdateWorkspace from "@/app/hook/useUpdateWorkspace";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface EditWorkspaceModalProps {
  workspaceId: string;
  name: string;
  description: string;
  onClose: () => void;
}

function EditWorkspaceModal({
  workspaceId,
  name,
  description,
  onClose,
}: EditWorkspaceModalProps) {
  type FormData = {
    name: string;
    description: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate, isPending, error, isSuccess } = useUpdateWorkspace();

  function submitFormModal(data: FormData) {
    mutate({
      workspaceId,
      data,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast.success("✓ Workspace updated successfully");
    }
  }, [isSuccess, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/10 backdrop-blur-md px-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Edit workspace
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update your workspace information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Form UI */}
        <form className="space-y-5" onSubmit={handleSubmit(submitFormModal)}>
          <div>
            <label
              htmlFor="workspace-name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Workspace name
            </label>

            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Workspace name is required.",
                },
              })}
              id="workspace-name"
              type="text"
              defaultValue={name}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-sm text-red-500"> {errors.name.message}</p>
          )}
          <div>
            <label
              htmlFor="workspace-description"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Description
            </label>

            <textarea
              {...register("description", {
                required: {
                  value: true,
                  message: "Workspace description is required.",
                },
              })}
              id="workspace-description"
              defaultValue={description}
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            {errors.description && (
              <p className="mt-2 text-sm text-red-500">
                {" "}
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-7 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Cancel
            </button>

            <button
              disabled={isPending}
              type="submit"
              className="cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {isPending ? "Saving..." : "Save changes"}{" "}
            </button>

            {error && (
              <p className="mt-2 text-sm text-red-500">{error.message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditWorkspaceModal;
