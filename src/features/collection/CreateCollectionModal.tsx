/** @format */
import useCreateCollection from "@/app/hook/useCreateCollection";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
interface CreateCollectionModalProps {
  workspaceId: string;
  onClose: () => void;
}
export default function CreateCollectionModal({
  workspaceId,
  onClose,
}: CreateCollectionModalProps) {
  type FormData = {
    name: string;
    description: string;
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>();

  const { mutate, isPending, error, isSuccess } = useCreateCollection();

  function submitForm(data: FormData) {
    mutate({
      workspaceId,
      ...data,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast.success("✓ Collection created successfully");
    }
  }, [isSuccess, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/10 px-4 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Create collection
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Create a collection to organize your API requests.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            {" "}
            <FiX size={20} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
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
                  message: "collection description is required.",
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
              className="cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <button disabled={isPending} type="submit">
                {isPending ? "Creating..." : "Create collection"}
              </button>

              {error && <p className="text-sm text-red-500">{error.message}</p>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
