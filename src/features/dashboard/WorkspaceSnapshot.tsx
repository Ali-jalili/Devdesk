/** @format */

import Loading from "@/ui/Loading";
import { motion } from "framer-motion";

interface WorkspaceSnapshotProps {
  workspace?: {
    name: string;
    collections: number;
    requests: number;
    environments: number;
    lastActivity: string;
  } | null;
  workspaceLoading: boolean;
}

export default function WorkspaceSnapshot({
  workspace,
  workspaceLoading,
}: WorkspaceSnapshotProps) {
  if (workspaceLoading) return <Loading />;
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2
        className="
          text-sm
          font-semibold
          text-slate-950
        "
      >
        Workspace Snapshot
      </h2>

      <div className="mt-5">
        <p
          className="
            text-xs
            text-slate-500
          "
        >
          Current workspace
        </p>

        <h3
          className="
            mt-1
            text-xl
            font-bold
            text-slate-950
          "
        >
          {workspace?.name ?? "No workspace"}
        </h3>

        <div
          className="
            mt-5
            grid
            grid-cols-3
            gap-4
          "
        >
          <div>
            <p className="text-lg font-bold text-slate-950">
              {workspace?.collections ?? 0}
            </p>

            <p className="text-xs text-slate-400">Collections</p>
          </div>

          <div>
            <p className="text-lg font-bold text-slate-950">
              {workspace?.requests ?? 0}
            </p>

            <p className="text-xs text-slate-400">Requests</p>
          </div>

          <div>
            <p className="text-lg font-bold text-slate-950">
              {workspace?.environments ?? 0}
            </p>

            <p className="text-xs text-slate-400">Environments</p>
          </div>
        </div>

        <p
          className="
            mt-6
            text-xs
            text-slate-400
          "
        >
          Last activity: {workspace?.lastActivity ?? "No activity yet"}
        </p>
      </div>
    </motion.section>
  );
}
