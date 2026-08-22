/** @format */

import DashboardHeader from "./DashboardHeader";
import WorkspaceSummaryCard from "./WorkspaceSummaryCard";
import StatsGrid from "./StatsGrid";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

function DashboardStats() {
  return (
    <div className="space-y-6 p-6">
      <DashboardHeader />

      <WorkspaceSummaryCard />

      <StatsGrid />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentActivity />

        <QuickActions />
      </div>
    </div>
  );
}

export default DashboardStats;
