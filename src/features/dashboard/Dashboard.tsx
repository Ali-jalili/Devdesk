/** @format */

import StatCards from "./StatCards";
import RecentActivity from "./RecentActivity";
import WorkspaceSnapshot from "./WorkspaceSnapshot";

export default function Dashboard() {
  return (
    <div
      className="
        mx-auto
        max-w-7xl
        space-y-8
        p-6
      "
    >
      {/* Header */}

      <section>
        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
            text-slate-950
          "
        >
          Welcome back, Arka 👋
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-slate-500
          "
        >
          Here's what's happening across your API workspace.
        </p>
      </section>

      <StatCards />

      <div
        className="
          grid
          gap-6
          lg:grid-cols-2
        "
      >
        <RecentActivity />

        <WorkspaceSnapshot />
      </div>
    </div>
  );
}
