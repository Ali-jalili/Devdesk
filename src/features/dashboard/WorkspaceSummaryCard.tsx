/** @format */

import { FiArrowRight, FiBriefcase } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function WorkspaceSummaryCard() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FiBriefcase size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Your Workspaces
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your API projects and environments.
            </p>
          </div>
        </div>

        <NavLink
          to="/app/workspaces"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
        >
          View workspaces
          <FiArrowRight size={16} />
        </NavLink>
      </div>
    </section>
  );
}

export default WorkspaceSummaryCard;
