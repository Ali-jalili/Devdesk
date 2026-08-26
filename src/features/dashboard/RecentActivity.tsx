/** @format */

const activities = [
  "Updated Login User request",
  "Created Authentication collection",
  "Updated Production environment",
  "Modified User API request",
];

export default function RecentActivity() {
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

      <div className="mt-5 space-y-4">
        {activities.map((item) => (
          <div
            key={item}
            className="
              flex
              items-start
              gap-3
              text-sm
              text-slate-600
            "
          >
            <span
              className="
                mt-2
                h-2
                w-2
                rounded-full
                bg-indigo-500
              "
            />

            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
