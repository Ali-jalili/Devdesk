/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <nav>
        <NavLink to="/app/dashboard">Dashboard</NavLink>
        <NavLink to="/app/projects">Projects</NavLink>
        <NavLink to="/app/settings">Settings</NavLink>
      </nav>
    </div>
  );
}
