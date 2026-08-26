/** @format */

import { motion } from "framer-motion";

interface Activity {
  text: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <section
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
        Recent Activity
      </h2>

      <div className="mt-6 space-y-5">
        {activities.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{
              opacity: 0,
              x: -10,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className="
              flex
              gap-4
            "
          >
            <div className="relative">
              <span
                className="
                  block
                  h-3
                  w-3
                  rounded-full
                  bg-indigo-500
                "
              />

              {index !== activities.length - 1 && (
                <span
                  className="
                    absolute
                    left-1/2
                    top-3
                    h-10
                    w-px
                    -translate-x-1/2
                    bg-slate-200
                  "
                />
              )}
            </div>

            <div>
              <p
                className="
                  text-sm
                  text-slate-700
                "
              >
                {item.text}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-400
                "
              >
                {item.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
