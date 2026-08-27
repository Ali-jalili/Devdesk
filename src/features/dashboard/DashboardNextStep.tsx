/** @format */

import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";

interface DashboardNextStepProps {
  workspace?: {
    id: string;
    collections: number;
    requests: number;
    environments: number;
  } | null;
}

export default function DashboardNextStep({
  workspace,
}: DashboardNextStepProps) {
  if (!workspace) {
    return (
      <section className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Next step
        </p>
        <h2 className="mt-2 text-base font-bold text-slate-950">
          Welcome to DevDesk
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Create your first workspace to start managing your APIs.
        </p>
        <Link
          to="/app/workspaces/new"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Create workspace
          <FiArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  const nextStep =
    workspace.collections === 0
      ? {
          label: "Create your first collection",
          to: `/app/workspaces/${workspace.id}/collections`,
        }
      : workspace.requests === 0
        ? {
            label: "Add your first API request",
            to: `/app/workspaces/${workspace.id}/collections`,
          }
        : workspace.environments === 0
          ? {
              label: "Configure an environment",
              to: `/app/workspaces/${workspace.id}/environments`,
            }
          : null;

  return (
    <section className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-5">
      <div className="flex items-start gap-3">
        <FiCheckCircle className="mt-0.5 h-5 w-5 text-indigo-600" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            Next step
          </p>
          <h2 className="mt-2 text-base font-bold text-slate-950">
            {nextStep ? nextStep.label : "Your workspace is ready"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {nextStep
              ? "Keep building your API workspace with the next useful piece."
              : "Your core API organization is in place."}
          </p>
        </div>
      </div>

      {nextStep && (
        <Link
          to={nextStep.to}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          Continue setup
          <FiArrowRight className="h-4 w-4" />
        </Link>
      )}
    </section>
  );
}
