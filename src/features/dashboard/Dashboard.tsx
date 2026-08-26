/** @format */

import useDashboard from "./useDashboard";
import RecentActivity from "./RecentActivity";
import StatCards from "./StatCards";
import WorkspaceSnapshot from "./WorkspaceSnapshot";

export default function Dashboard() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">
          Welcome back, Arka 👋
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Here's what's happening across your API workspace.
        </p>
      </section>

      <StatCards stats={data} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />

        <WorkspaceSnapshot />
      </div>
    </div>
  );
}
