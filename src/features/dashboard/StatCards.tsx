/** @format */

import { FiBriefcase, FiFolder, FiSend, FiSliders } from "react-icons/fi";
import { motion } from "framer-motion";

interface StatCardsProps {
  stats: {
    workspaces: number;
    collections: number;
    requests: number;
    environments: number;
  };
}

export default function StatCards({ stats }: StatCardsProps) {
  const items = [
    {
      title: "Workspaces",
      value: stats.workspaces,
      description: "Active projects",
      icon: FiBriefcase,
    },
    {
      title: "Collections",
      value: stats.collections,
      description: "API groups",
      icon: FiFolder,
    },
    {
      title: "Requests",
      value: stats.requests,
      description: "Stored requests",
      icon: FiSend,
    },
    {
      title: "Environments",
      value: stats.environments,
      description: "Configured setups",
      icon: FiSliders,
    },
  ];

  return (
    <div className="grid overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -4,
            }}
            className="group flex items-center gap-3 border-b border-slate-200 p-4 transition hover:bg-slate-50 sm:last:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0"
          >
            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                bg-slate-100
                text-slate-600
                transition
                group-hover:bg-indigo-50
                group-hover:text-indigo-600
              "
            >
              <Icon className="h-5 w-5" />
            </div>

            <p
              className="
                text-xs
                font-medium
                text-slate-500
              "
            >
              {item.title}
            </p>

            <p
              className="
                mt-0.5
                text-xl
                font-bold
                text-slate-950
              "
            >
              {item.value}
            </p>

            <p
              className="
                hidden
              "
            >
              {item.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
