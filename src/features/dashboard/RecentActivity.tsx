/** @format */

import { FiEdit2, FiFolderPlus, FiSend } from "react-icons/fi";

const activities = [
  {
    id: 1,
    title: "Created a new collection",
    description: "Authentication API",
    time: "10 minutes ago",
    icon: FiFolderPlus,
  },
  {
    id: 2,
    title: "Updated request",
    description: "Login endpoint",
    time: "2 hours ago",
    icon: FiEdit2,
  },
  {
    id: 3,
    title: "Created new request",
    description: "Get users API",
    time: "Yesterday",
    icon: FiSend,
  },
];

function RecentActivity() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest changes in your workspace
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-xl border border-border bg-background p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon size={17} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>

              <span className="text-xs text-muted-foreground">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentActivity;
