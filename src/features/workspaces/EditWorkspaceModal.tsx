/** @format */

import { FiX } from "react-icons/fi";

interface EditWorkspaceModalProps {
  name: string;
  description: string;
  onClose: () => void;
}

function EditWorkspaceModal({
  name,
  description,
  onClose,
}: EditWorkspaceModalProps) {
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
        <div className="space-y-5">
          <div>
            <label
              htmlFor="workspace-name"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Workspace name
            </label>

            <input
              id="workspace-name"
              type="text"
              defaultValue={name}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="workspace-description"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Description
            </label>

            <textarea
              id="workspace-description"
              defaultValue={description}
              rows={4}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
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
            type="button"
            className="cursor-pointer rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditWorkspaceModal;
