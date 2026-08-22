/** @format */

import { FiBriefcase, FiFolder, FiSend } from "react-icons/fi";

function WorkspaceSummaryCard() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FiBriefcase size={22} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">
                DevDesk API
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your active workspace
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FiFolder size={16} />

            <span className="text-sm">Collections</span>
          </div>

          <p className="mt-3 text-2xl font-bold text-foreground">12</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FiSend size={16} />

            <span className="text-sm">Requests</span>
          </div>

          <p className="mt-3 text-2xl font-bold text-foreground">48</p>
        </div>

        <div className="rounded-xl border border-border bg-background p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FiBriefcase size={16} />

            <span className="text-sm">Environment</span>
          </div>

          <p className="mt-3 text-2xl font-bold text-foreground">3</p>
        </div>
      </div>
    </section>
  );
}

export default WorkspaceSummaryCard;
