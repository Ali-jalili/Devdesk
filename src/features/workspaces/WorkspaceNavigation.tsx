/** @format */

import { NavLink } from "react-router-dom";

const navigation = [
  {
    label: "Overview",
    path: "",
  },
  {
    label: "Collections",
    path: "collections",
  },
  {
    label: "Environments",
    path: "environments",
  },
];

export default function WorkspaceNavigation() {
  return (
    <nav className="overflow-x-auto border-b border-slate-200">
      <div className="flex min-w-max gap-1">
        {navigation.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end={item.path === ""}
            className={({ isActive }) =>
              `
              relative
              rounded-t-lg
              px-4
              py-2.5
              text-sm
              font-semibold
              transition

              ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }

              `
            }
          >
            {({ isActive }) => (
              <>
                {item.label}

                {isActive && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-2
                      right-2
                      h-0.5
                      rounded-full
                      bg-indigo-600
                    "
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
