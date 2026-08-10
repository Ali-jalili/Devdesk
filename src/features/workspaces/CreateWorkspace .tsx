/** @format */

import { useForm } from "react-hook-form";

export default function CreateWorkspace() {
  type FormData = {
    workspaceName: string;
    workspaceDescription: string;
  };

  const { register, handleSubmit } = useForm<FormData>();

  function handleSubmitForm(data: FormData) {
    console.log(data);
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            New workspace
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Create your workspace
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Create a workspace to organize your API projects, collections,
            requests, and environments.
          </p>
        </div>

        <form
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="space-y-6">
            {/* Workspace Name */}
            <div>
              <label
                htmlFor="workspace-name"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Workspace Name
              </label>

              <input
                {...register("workspaceName", { required: true })}
                id="workspace-name"
                type="text"
                placeholder="e.g. My API Project"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />

              <p className="mt-2 text-xs text-slate-400">
                Choose a clear name that helps you identify this workspace.
              </p>
            </div>

            {/* Workspace Description */}
            <div>
              <label
                htmlFor="workspace-description"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Description
                <span className="ml-1 font-normal text-slate-400">
                  (optional)
                </span>
              </label>

              <textarea
                {...register("workspaceDescription")}
                id="workspace-description"
                rows={4}
                placeholder="What is this workspace for?"
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />

              <p className="mt-2 text-xs text-slate-400">
                A short description will help you understand the purpose of this
                workspace later.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
              >
                Create Workspace
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
