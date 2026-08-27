/** @format */

import { FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface DashboardReadinessProps {
  workspace?: {
    collections: number;
    requests: number;
    environments: number;
  } | null;
}

export default function DashboardReadiness({
  workspace,
}: DashboardReadinessProps) {
  const steps = [
    { label: "Workspace created", complete: !!workspace },
    { label: "Collection added", complete: (workspace?.collections ?? 0) > 0 },
    {
      label: "Request documented",
      complete: (workspace?.requests ?? 0) > 0,
    },
    {
      label: "Environment configured",
      complete: (workspace?.environments ?? 0) > 0,
    },
  ];

  const completedSteps = steps.filter((step) => step.complete).length;
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Workspace readiness
          </p>

          <p className="mt-1 text-sm text-slate-500">
            The essentials for a documented API workflow.
          </p>
        </div>

        <span className="text-sm font-semibold text-slate-500">
          {workspace ? `${completedSteps}/${steps.length}` : "No workspace"}
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(completedSteps / steps.length) * 100}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full rounded-full bg-emerald-500"
        />
      </div>

      <div className="mt-4 space-y-2.5">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-3 text-sm">
            <FiCheckCircle
              className={step.complete ? "text-emerald-500" : "text-slate-300"}
            />
            <span
              className={step.complete ? "text-slate-700" : "text-slate-400"}
            >
              {step.label}
            </span>
            <span className="ml-auto text-[11px] text-slate-400">
              {step.complete ? "Ready" : "To do"}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs font-medium text-emerald-600">
        {workspace
          ? completedSteps === steps.length
            ? "Your workspace is ready."
            : "Complete the remaining setup steps."
          : "Create a workspace to begin."}
      </p>
    </motion.section>
  );
}
