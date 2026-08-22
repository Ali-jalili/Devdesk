/** @format */

import { FiPlus } from "react-icons/fi";

function DashboardHeader() {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Welcome back 👋
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Manage your API workspace, collections, and requests from one place.
        </p>
      </div>

      <button
        type="button"
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
      >
        <FiPlus size={16} />
        New Request
      </button>
    </section>
  );
}

export default DashboardHeader;
