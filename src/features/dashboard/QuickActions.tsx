/** @format */

import { FiFolderPlus, FiPlus, FiSliders } from "react-icons/fi";

const actions = [
  {
    title: "Create Request",
    description: "Start a new API request",
    icon: FiPlus,
  },
  {
    title: "Create Collection",
    description: "Organize your requests",
    icon: FiFolderPlus,
  },
  {
    title: "Add Environment",
    description: "Manage API variables",
    icon: FiSliders,
  },
];

function QuickActions() {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Start working faster
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="group flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background p-4 text-left transition hover:border-primary/40 hover:bg-muted"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon size={18} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {action.title}
                </h3>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;
