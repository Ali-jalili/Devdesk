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
    label: "Requests",
    path: "requests",
  },
  {
    label: "Environments",
    path: "environments",
  },
];

export default function WorkspaceNavigation() {
  return (
    <nav className="flex gap-1 border-b border-border">
      {navigation.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          end={item.path === ""}
          className={({ isActive }) =>
            `
            px-4 py-3 text-sm font-medium transition
            ${
              isActive
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }
            `
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
