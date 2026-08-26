/** @format */

import { FiBriefcase, FiFolder, FiSend, FiSliders } from "react-icons/fi";

import { motion } from "framer-motion";

const stats = [
  {
    title: "Workspaces",
    value: 3,
    description: "Active projects",
    icon: FiBriefcase,
  },
  {
    title: "Collections",
    value: 12,
    description: "API groups",
    icon: FiFolder,
  },
  {
    title: "Requests",
    value: 48,
    description: "Stored requests",
    icon: FiSend,
  },
  {
    title: "Environments",
    value: 5,
    description: "Configured setups",
    icon: FiSliders,
  },
];

export default function StatCards() {
  return (
    <div
      className="
        grid
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {stats.map((item, index) => {
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
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
              transition
              hover:shadow-md
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-lg
                bg-indigo-50
                text-indigo-600
              "
            >
              <Icon className="h-5 w-5" />
            </div>

            <p
              className="
                mt-4
                text-sm
                font-medium
                text-slate-500
              "
            >
              {item.title}
            </p>

            <p
              className="
                mt-2
                text-3xl
                font-bold
                text-slate-950
              "
            >
              {item.value}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-400
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
