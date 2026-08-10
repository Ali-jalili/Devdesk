/** @format */

import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <p className="text-lg font-bold tracking-tight text-slate-950">
              DevDesk
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              A focused workspace for organizing your API workflow, requests,
              collections, and environments.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h3 className="text-sm font-semibold text-slate-950">Product</h3>

              <nav className="mt-4 flex flex-col gap-3">
                <a
                  href="#features"
                  className="text-sm text-slate-500 transition hover:text-slate-950"
                >
                  Features
                </a>

                <NavLink
                  to="/signup"
                  className="text-sm text-slate-500 transition hover:text-slate-950"
                >
                  Get Started
                </NavLink>
              </nav>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-950">Project</h3>

              <nav className="mt-4 flex flex-col gap-3">
                <a
                  href="#"
                  className="text-sm text-slate-500 transition hover:text-slate-950"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DevDesk</p>

          <p>Built for developers.</p>
        </div>
      </div>
    </footer>
  );
}
