/** @format */

import useUpdateCollection from "@/app/hook/useUpdateCollection";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";

interface EditCollectionModalProps {
  workspaceId: string;
  collectionId: string;
  name: string;
  description: string;
  onClose: () => void;
}

type FormData = {
  name: string;
  description: string;
};

export default function EditCollectionModal({
  workspaceId,
  collectionId,
  name,
  description,
  onClose,
}: EditCollectionModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name,
      description,
    },
  });

  const { mutate, isSuccess, isPending } = useUpdateCollection();

  function submitFormModal(data: FormData) {
    mutate({
      workspaceId,
      collectionId,
      data,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast.success("✓ Collection updated successfully");
    }
  }, [isSuccess, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/10 px-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Edit Collection
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update your collection information.
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

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(submitFormModal)}>
          {/* Name */}
          <div>
            <label
              htmlFor="collection-name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Collection name
            </label>

            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Collection name is required.",
                },
              })}
              id="collection-name"
              type="text"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="collection-description"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Description
            </label>

            <textarea
              {...register("description", {
                required: {
                  value: true,
                  message: "Collection description is required.",
                },
              })}
              id="collection-description"
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />

            {errors.description && (
              <p className="mt-2 text-sm text-red-500">
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
              {isPending ? "Save.." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
