/** @format */

import { FiActivity, FiFolder, FiSend, FiSliders } from "react-icons/fi";

const stats = [
  {
    title: "Total Requests",
    value: "48",
    icon: FiSend,
    description: "API requests created",
  },
  {
    title: "Collections",
    value: "12",
    icon: FiFolder,
    description: "Organized request groups",
  },
  {
    title: "Environments",
    value: "3",
    icon: FiSliders,
    description: "Active environments",
  },
  {
    title: "API Calls",
    value: "256",
    icon: FiActivity,
    description: "Total executions",
  },
];

function StatsGrid() {
  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon size={20} />
              </div>

              <span className="text-xs text-muted-foreground">Overview</span>
            </div>

            <p className="mt-5 text-3xl font-bold text-foreground">
              {item.value}
            </p>

            <h3 className="mt-1 text-sm font-medium text-foreground">
              {item.title}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              {item.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}

export default StatsGrid;
